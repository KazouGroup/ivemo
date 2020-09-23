<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactRequest;
use App\Http\Resources\ContactserviceResource;
use App\Http\Resources\PrivateEmploymentResource;
use App\Http\Resources\Profile\PrivateAnnonceventeResource;
use App\Model\annoncetype;
use App\Model\annoncevente;
use App\Model\categoryannoncevente;
use App\Model\city;
use App\Model\user;
use App\Services\Contactusers\ContactusersventeService;
use App\Model\contactservice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactservicannonceventeController extends Controller
{
 /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'sendcontactserviceannonce',
        ]]);
    }

    public function contactservice(user $user)
    {
        $this->authorize('update',$user);

        return view('user.contactservice.index', compact('user'));
    }

    public function personalmessagesdatas(user $user)
    {
        $this->authorize('update',$user);

        return view('user.contactservice.index', compact('user'));
    }

    public function contactservice_statistique(user $user, annoncetype $annoncetype,annoncevente $annoncevente)
    {
        return view('user.contactservice.show', compact('user'));
    }

    public function contactservice_statistiqueshow($user,contactservice $contactservice)
    {

        return view('user.contactservice.showcontact', compact('contactservice'));
    }

    public function sendcontactserviceannonce(StorecontactRequest $request, annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$user,annoncevente $annoncevente)
    {


        $contactservice = $annoncevente->contactservices()->create([
            'full_name' => $request->full_name,
            'to_id' => $annoncevente->user_id,
            'email' => $request->email,
            'phone' => $request->phone,
            'from_id' => auth()->guest() ? null : auth()->id(),
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
            'message' => $request->message,
        ]);

        ContactusersventeService::newEmailToannoncelocationpageShow($request,$annoncevente);

        return response()->json($contactservice,200);
    }

    public function apicontactservice(user $user)
    {
        $this->authorize('update',$user);

        $contactservices = $user->annoncelocations()
            ->with('user','city','annoncetype','categoryannoncevente','uploadimages')
            ->whereIn('user_id',[$user->id])
            ->with(['user' => function ($q) {$q->with('profile')
                ->distinct()->get();}])
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->with(['uploadimages' => function ($q) use ($user){
                $q->where(['status' => 1])
                    ->get();
            }])
            ->withCount(['uploadimages' => function ($q) use ($user){
                $q->where(['status' => 1]);
            }])
            ->withCount(['contactservices' => function ($q) use ($user){
                $q->where(['status_red' => 0])->whereIn('to_id',[$user->id]);
            }])->orderBy('contactservices_count','desc')
            ->has('contactservices','>=',1)
            ->distinct()->get();

        return response()->json($contactservices,200);

    }

    public function apicontactservice_statistique(user $user,annoncetype $annoncetype, annoncevente $annoncevente)
    {
        $contactservice = new PrivateAnnonceventeResource(annoncevente::whereSlugin($annoncevente->slugin)
            ->withCount(['contactservices' => function ($q) use ($user){
                $q->where(['status_red' => 0])
                    ->with('to','from')
                    ->whereIn('to_id',[$user->id]);},])
            ->whereIn('user_id',[$user->id])
            ->with(['contactservices' => function ($q) use ($user){
                $q->with('to','from')
                    ->whereIn('to_id',[$user->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])
            ->with('user','city','annoncetype','categoryannoncevente','uploadimages')
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])->first());

        return response()->json($contactservice,200);
    }


    //public function contactservice_export(user $user, annoncevente $annoncevente)
    //{
    //    return Excel::download(new ContactserviceemploymentExport($user,$annoncevente), 'Infos-users.xlsx');
    //}


    public function apicontactservice_statistiqueshow($user,contactservice $contactservice)
    {
        $contactservice = new ContactserviceResource(contactservice::whereSlug($contactservice->slug)
        ->with('to','from','contactserviceable')
        ->whereIn('to_id',[Auth::id()])
        ->with(['contactserviceable' => function ($q){
            $q->whereIn('user_id',[Auth::id()])
                ->withCount(['uploadimages'])
                ->with('user','city','annoncetype','categoryannoncevente','uploadimages')
                ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                ->whereHas('city', function ($q) {$q->where('status',1);})
                ->with(['user.profile' => function ($q){$q->distinct()->get();},]);},
        ])->first());


        return response()->json($contactservice,200);
    }
}
