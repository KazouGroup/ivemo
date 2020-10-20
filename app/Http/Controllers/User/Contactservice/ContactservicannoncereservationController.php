<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Exports\ContactserviceannonceventesExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactuserannoncelocationRequest;
use App\Http\Resources\Profile\PrivateAnnonceventeResource;
use App\Models\annoncereservation;
use App\Models\annoncetype;
use App\Models\annoncevente;
use App\Models\responsecontactservice;
use App\Models\user;
use App\Services\CommentAndResponseService;
use App\Services\Contactusers\ContactusersreservationService;
use App\Models\contactservice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ContactservicannoncereservationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function contactservice(user $user)
    {
        $this->authorize('update', $user);

        return view('user.contactservice.index', compact('user'));
    }

    public function personalmessagesdatas()
    {
        $user = Auth::user();

        $this->authorize('update', $user);

        return view('user.contactservice.index', compact('user'));
    }

    public function personalmessagesdatassend()
    {
        $user = Auth::user();

        $this->authorize('update', $user);

        return view('user.contactservice.index', compact('user'));
    }

    public function contactservice_statistique(user $user, annoncetype $annoncetype, annoncereservation $annoncereservation)
    {
        $this->authorize('update', $user);

        return view('user.contactservice.show', compact('user'));
    }

    /**
     * @param user $user
     * @param annoncetype $annoncetype
     * @param annoncereservation $annoncereservation
     */
    public function contactservice_statistiqueshow(user $user, annoncetype $annoncetype, annoncereservation $annoncereservation)
    {
        if (Auth::id() === $user->id || Auth::id() === $annoncereservation->user_id){
            return view('user.contactservice.showcontact', compact('user','annoncetype','annoncereservation'));
        }else (abort(401));

    }

    public function sendcontactserviceannonce(StorecontactuserannoncelocationRequest $request, annoncetype $annoncetype, $categoryannoncereservation, $city, $user, annoncereservation $annoncereservation)
    {

        $contactservice = ContactusersreservationService::formsenddata($request,$annoncereservation);

        ContactusersreservationService::newEmailToannoncereservationpageShow($request, $annoncereservation);

        return response()->json($contactservice, 200);
    }

    public function apicontactservice(user $user)
    {
        $this->authorize('update', $user);

        $contactservices = $user->annoncereservations()
            ->with('user', 'city', 'annoncetype', 'periodeannonce', 'categoryannoncereservation', 'uploadimages')
            ->whereIn('user_id', [$user->id])
            ->with(['user' => function ($q) {
                $q->with('profile')
                    ->distinct()->get();
            }])
            ->whereHas('categoryannoncereservation', function ($q) {
                $q->where('status', 1);
            })
            ->whereHas('city', function ($q) {
                $q->where('status', 1);
            })
            ->with(['uploadimages' => function ($q) use ($user) {
                $q->where(['status' => 1])
                    ->get();
            }])
            ->withCount(['uploadimages' => function ($q) use ($user) {
                $q->where(['status' => 1]);
            }])
            ->withCount(['contactservices' => function ($q) use ($user) {
                $q->where(['status_red' => 0])->whereIn('to_id', [$user->id]);
            }])->orderBy('contactservices_count', 'desc')
            ->has('contactservices', '>=', 1)
            ->distinct()->get();

        return response()->json($contactservices, 200);

    }

    public function apicontactservice_statistique(user $user, annoncetype $annoncetype, annoncereservation $annoncereservation)
    {
        $this->authorize('update', $user);

        $contactservice = new PrivateAnnonceventeResource(annoncereservation::whereSlugin($annoncereservation->slugin)
            ->withCount(['contactservices' => function ($q) use ($user) {
                $q->where(['status_red' => 0])
                    ->with('to', 'from')
                    ->whereIn('to_id', [$user->id]);
            },])
            ->whereIn('user_id', [$user->id])
            ->with(['contactservices' => function ($q) use ($user) {
                $q->with('to', 'from')
                    ->whereIn('to_id', [$user->id])
                    ->orderBy('created_at', 'DESC')
                    ->distinct()->get();
            },
            ])
            ->with('user', 'city', 'annoncetype', 'periodeannonce', 'categoryannoncereservation', 'uploadimages')
            ->whereHas('categoryannoncereservation', function ($q) {
                $q->where('status', 1);
            })
            ->whereHas('city', function ($q) {
                $q->where('status', 1);
            })
            ->with(['user.profile' => function ($q) {
                $q->distinct()->get();
            },])->first());

        return response()->json($contactservice, 200);
    }


    public function contactservice_export(user $user, annoncevente $annoncevente)
    {
        $this->authorize('update', $user);

        return Excel::download(new ContactserviceannonceventesExport($user, $annoncevente), 'Infos-users.xlsx');
    }

    /**
     * @param user $user
     * @param annoncetype $annoncetype
     * @param annoncereservation $annoncereservation
     * @return \Illuminate\Http\JsonResponse
     */

    public function apicontactservice_statistiqueshow(user $user, annoncetype $annoncetype, annoncereservation $annoncereservation)
    {
        if (Auth::id() === $user->id || Auth::id() === $annoncereservation->user_id){

            $contactservice = $contactservice = ContactusersreservationService::apicontactservice_statistique($user,$annoncereservation);;

            return response()->json($contactservice, 200);

        }else (abort(401));

    }

    /**
     * @param Request $request
     * @param user $user
     * @param annoncetype $annoncetype
     * @param annoncereservation $annoncereservation
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */

    public function sendsendcommentcontact(Request $request, user $user, annoncetype $annoncetype, annoncereservation $annoncereservation)
    {
        $this->validate($request,['message'=>'required|string|min:2|max:5000']);

        if (Auth::id() === $user->id || Auth::id() === $annoncereservation->user_id){

            ContactusersreservationService::formsenddata($request,$annoncereservation);

            ContactusersreservationService::newEmailToannoncereservationpageShow($request, $annoncereservation);

            return response()->json([
                'success' => "Message send successfully"
            ],200);

        }else (abort(401));

    }

    /**
     * @param Request $request
     * @param user $user
     * @param annoncetype $annoncetype
     * @param annoncereservation $annoncereservation
     * @param contactservice $contactservice
     * @return mixed
     */
    public function sendresponsecommentcotact(Request $request,user $user, annoncetype $annoncetype, annoncereservation $annoncereservation,contactservice $contactservice)
    {
        $validatedData = $request->validate(['message' => 'required|min:2|max:5000']);

        if (Auth::id() === $user->id || Auth::id() === $annoncereservation->user_id){
           responsecontactservice::create([
                'message' => $validatedData['message'],
                'contactservice_id' => $contactservice->id,
            ]);

            CommentAndResponseService::newEmailTonewcoontactservicepageShow($request,$annoncereservation, $contactservice);

            return response()->json([
                'success' => "Message send successfully"
            ],200);

        }else (abort(401));
    }

}
