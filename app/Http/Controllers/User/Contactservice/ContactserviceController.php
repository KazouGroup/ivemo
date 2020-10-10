<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Http\Controllers\Controller;
use App\Models\annoncelocation;
use App\Models\annoncereservation;
use App\Models\annoncevente;
use App\Models\contactservice;
use App\Models\employment;
use App\Models\user;
use App\Services\HelpersService;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ContactserviceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function apipersonacontactservices()
    {
        $user = Auth::user();

        $contactservices = HelpersService::helperscontactuserscount($user)
            ->with(['contactusers' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->with(['notifications' => function ($q) use ($user){
                $q->whereIn('notifiable_id',[$user->id])
                    ->latest()->distinct()->get();},
            ])

            ->with(['contactservicesemployments' => function ($q) use ($user){
                $q->with('to','from','contactserviceable')
                    ->where('contactserviceable_type',employment::class)
                    ->whereIn('to_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->with(['contactservicesannoncelocations' => function ($q) use ($user){
                $q->with('to','from','contactserviceable')
                    ->where('contactserviceable_type',annoncelocation::class)
                    ->whereIn('to_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->with(['contactservicesannonceventes' => function ($q) use ($user){
                $q->with('to','from','contactserviceable')
                    ->where('contactserviceable_type',annoncevente::class)
                    ->whereIn('to_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->with(['contactservicesannoncereservations' => function ($q) use ($user){
                $q->with('to','from','contactserviceable')
                    ->where('contactserviceable_type',annoncereservation::class)
                    ->whereIn('to_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return response()->json($contactservices,200);

    }

    public function statusarchvement(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_archvement' => !$contactservice->status_archvement,]);

        return response('Success',Response::HTTP_ACCEPTED);
    }

    public function favorite(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_favorite' => 1]);

        return response('Favorite',Response::HTTP_ACCEPTED);
    }

    public function unfavorite(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_favorite' => 0,]);

        return response('Unfavorite',Response::HTTP_ACCEPTED);
    }

    public function statuscontacts(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_red' => !$contactservice->status_red,]);

        return response('Success',Response::HTTP_ACCEPTED);
    }

    public function statuscontactsisadmin(contactservice $contactservice)
    {

        $contactservice->update(['status_red' => !$contactservice->status_red,]);

        return response('Success',Response::HTTP_ACCEPTED);
    }

    /*
     * Les permission ne sont pa trop obligatoire dans les action
     */

    public function contactred(contactservice $contactservice)
    {

        $contactservice->update(['status_red' => 1,]);

        return response('Red',Response::HTTP_ACCEPTED);
    }

    public function destroy(contactservice $contactservice)
    {
        $contactservice->delete();

        return ['message' => 'Deleted successfully'];
    }

    /*
     * Ce traitement concerne la table notification rien a voir avec la table contactservices
     */
    public function allnotifications()
    {
        $user = Auth::user();

        $this->authorize('update',$user);

        return view('user.contactservice.notifications', compact('user'));
    }

    public function rednotification(DatabaseNotification $notification)
    {

        $notification->markAsRead();

        return ['message' => 'Message red successfully'];
    }
}
