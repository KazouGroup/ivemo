<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StoreRequest;
use App\Http\Resources\UserResource;
use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncetype;
use App\Model\contactuser;
use App\Model\reservation;
use App\Model\user;
use App\Services\ContactuserService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'api','apiprofilepublique','apiannoncereservationbyprofilpublique','public_profile_send_message',
            'apiannoncelocationbyprofilpublique','public_profile'
        ]]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function apiprofilepublique($user)
    {
        $user = new UserResource(user::whereSlug($user)
            ->first());

        return response()->json($user, 200);
    }

    public function apiannoncereservationbyprofilpublique(user $user,annoncetype $annoncetype)
    {
        $annoncereservations = annoncereservation::whereIn('user_id',[$user->id])->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncereservation','city','annoncetype')
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->where('status',1);
            })->distinct()->get()->toArray();

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncelocationbyprofilpublique(user $user,annoncetype $annoncetype)
    {
        $annoncelocations = annoncelocation::whereIn('user_id',[$user->id])->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncelocation','city','annoncetype')
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->where('status',1);
            })->distinct()->get()->toArray();

        return response()->json($annoncelocations, 200);
    }

    public function apipersonalreservations()
    {
        $personnalreservations = reservation::whereIn('user_id',[auth()->user()->id])->with('user','annoncereservation')
            ->orderBy('created_at','DESC')
            ->with([
                'annoncereservation.categoryannoncereservation' => function ($q){
                    $q->select('id','name','slug','color_name','user_id');},
                'annoncereservation.imagereservations' => function ($q){
                    $q->distinct()->get();},
                'annoncereservation.city' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncereservation.annoncetype' => function ($q){
                    $q->select('id','name','slug');},
                'annoncereservation.user' => function ($q){
                    $q->distinct()->get();}
            ])->whereHas('annoncereservation', function ($q) {
                 $q->where('status',1);
             })->distinct()->get()->toArray();

        return response()->json($personnalreservations, 200);
    }


    public function apiannoncereservationbookeds()
    {
        $personnalreservations = reservation::with('user','annoncereservation')
            ->orderBy('created_at','DESC')
            ->with([
                'annoncereservation.categoryannoncereservation' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncereservation.city' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncereservation.annoncetype' => function ($q){
                    $q->select('id','name','slug');},
                'annoncereservation.user' => function ($q){
                    $q->distinct()->get();}
            ])->whereHas('annoncereservation', function ($q) {
                $q->whereIn('user_id',[auth()->user()->id]);
            })->distinct()->get()->toArray();

        return response()->json($personnalreservations, 200);
    }

        public function annonces_reservations_booked_confirmed(reservation $reservation, $id)
        {
             $reservation = reservation::where('id', $id)->findOrFail($id);

            if(auth()->user()->id === $reservation->annoncereservation->user_id){
                        $reservation->update([
                            'status' => 1,
                        ]);

              return response('Confirmed',Response::HTTP_ACCEPTED);
            }


        }

        public function annonces_reservations_booked_unconfirmed(reservation $reservation, $id)
        {
            $reservation = reservation::where('id', $id)->findOrFail($id);
               if(auth()->user()->id === $reservation->annoncereservation->user_id){
                $reservation->update([ 'status' => 0,]);
                 return response('Unconfirmed',Response::HTTP_ACCEPTED);
               }

        }





    public function apipersonalmessagescontacts()
    {
        $contactusers = contactuser::whereIn('user_id',[auth()->user()->id])
            ->distinct()->get()->toArray();

        return response()->json($contactusers, 200);
    }
     /**
      *
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function profile_account()
    {
        $user = auth()->user();

        return view('user.profile.profile_account',[
            'user' => $user,
        ]);
    }

    public function change_password()
    {

        $user = auth()->user();

        return view('user.profile.change_password_account',[
            'user' => $user,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function api_profile_account()
    {
        $user = auth()->user();

        return response()->json($user,200);
    }

    public function personal_reservations()
    {
        return view('user.profile.personal_annoncereservations',[
        'user' => auth()->user()

        ]);
    }

    public function annonces_reservations_booked()
    {
        return view('user.profile.personal_annoncereservations',[
           'user' => auth()->user()

           ]);
    }

    public function public_profile(user $user)
    {
      return view('user.profile.profile_account',[
                'user' => $user,
            ]);
    }

    public function public_profile_send_message(StoreRequest $request, user $user)
    {
        $contactuser = new contactuser();

        $slug = sha1(('YmdHis') . str_random(30));
        $contactuser->fill($request->all());
        $contactuser->slug = $slug;
        $contactuser->user_id = $user->id;

        ContactuserService::newEmail($request,$user);

        $contactuser->save();

        return response()->json($contactuser,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

