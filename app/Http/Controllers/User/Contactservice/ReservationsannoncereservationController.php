<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StoreRequest;
use App\Models\annoncereservation;
use App\Models\annoncetype;
use App\Models\user;
use App\Services\Contactusers\ContactusersreservationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationsannoncereservationController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth');
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


    public function contactservice_statistiqueshow(user $user, annoncetype $annoncetype, annoncereservation $annoncereservation)
    {

        if (Auth::id() === $user->id || Auth::id() === $annoncereservation->user_id){
            return view('user.contactservice.showcontact', compact('user','annoncetype','annoncereservation'));
        }else (abort(401));

    }


    public function sendcontactserviceannonce(StoreRequest $request, annoncetype $annoncetype, $categoryannoncereservation, $city, $user, annoncereservation $annoncereservation)
    {

        $reservation = ContactusersreservationService::formsendreservationdata($request,$annoncereservation);

        //ContactusersreservationService::newEmailToannoncereservationpageShow($request, $annoncereservation);

        return response()->json($reservation, 200);
    }


    public function apicontactservice_statistique(user $user, annoncetype $annoncetype, annoncereservation $annoncereservation)
    {

        if (Auth::id() === $user->id || Auth::id() === $annoncereservation->user_id){

            $contactservice = ContactusersreservationService::apicontactservice_statistique($user,$annoncereservation);

            return response()->json($contactservice, 200);

        }else (abort(401));

    }

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

}
