<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StoreRequest;
use App\Http\Resources\UserResource;
use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncetype;
use App\Model\annoncevente;
use App\Model\contactuser;
use App\Model\reservation;
use App\Model\user;
use App\Services\ContactuserService;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use function foo\func;

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
            'apiannoncelocationbyprofilpublique','public_profile','publicprofilannoncereservations',
            'publicprofilannoncelocations','apiprofilannoncelocations','apiprofilannoncereservations',
            'apiprofilannoncereserventes'
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
        $personnalreservations = ProfileService::apiannoncereservationbookeds();

        return response()->json($personnalreservations, 200);
    }

    public function annonces_reservations_booked_confirmed(reservation $reservation, $id)
    {
        $user = auth()->user();
        $reservation = reservation::where('id', $id)->findOrFail($id);

        if(auth()->user()->id === $reservation->annoncereservation->user_id){
            $reservation->update(['status' => 1,]);

            ProfileService::newEmailConfirmationreservation($reservation,$user);

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
            ->orderBy('created_at','DESC')->distinct()->get()->toArray();

        return response()->json($contactusers, 200);
    }

    public function apipersonalmessagescontactsshow(contactuser $contactuser)
    {
        $contactusers = contactuser::with('user')->whereSlug($contactuser->slug)->first();

        return response()->json($contactusers, 200);
    }

    public function apipersonalmessagesannonces_locations_show(contactuser $contactuser)
    {
        $contactusers = ProfileService::apipersonalmessagesannonces_locations_show($contactuser);

        return response()->json($contactusers, 200);
    }

    public function apipersonalmessagesannonces_locations()
    {
        $contactusers = ProfileService::apipersonalmessagesannonces_locations();

        return response()->json($contactusers, 200);
    }

    public function apipersonalmessagesannonces_reservations()
    {
        $contactusers = ProfileService::apipersonalmessagesannonces_reservations();

        return response()->json($contactusers, 200);
    }

    public function apiprofilannoncelocations(user $user)
    {

        $userannoncelocations = annoncelocation::where('status',1)
            ->with('user','categoryannoncelocation','city','annoncetype')
            ->whereIn('user_id',[$user->id])
            ->whereIn('annoncetype_id',[1])
            ->distinct()->get()->toArray();

        return response()->json($userannoncelocations, 200);
    }

   public function publicprofilannoncelocations(user $user)
   {
       return view('user.profile.annonces.publicprofilannoncelocations',[
           'user' => $user,
           ]);
   }

    public function apiprofilannoncereservations(user $user)
    {
        $annoncesreservations = annoncereservation::where('status',1)
            ->with('user','categoryannoncereservation','city','annoncetype','imagereservations')
            ->whereIn('user_id',[$user->id])
            ->whereIn('annoncetype_id',[3])
            ->distinct()->get()->toArray();

        return response()->json($annoncesreservations, 200);
    }

    public function publicprofilannoncereservations(user $user)
    {
       return view('user.profile.annonces.publicprofilannoncereservations',[
           'user' => $user,
       ]);
    }

    public function apiprofilannoncereserventes(user $user)
    {
        //Querry a refaire
        $annoncesventes = annoncevente::where('status',1)
            ->with('user','categoryannoncevente','city','annoncetype')
            ->whereIn('user_id',[$user->id])
            ->get();

        return response()->json($annoncesventes, 200);
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

        ContactuserService::newEmailToprofileUser($request,$user);

        $contactuser->save();

        return response()->json($contactuser,200);
    }

    public function personalmessagesannonces_locations()
    {
         return view('user.profile.contactuser.personal_mailannonces_locations',[
             'user' => auth()->user()
             ]);
    }

     public function personalmessagesannonces_locations_show(contactuser $contactuser)
    {
         return view('user.profile.contactuser.personal_mailannonces_locations_show',[
             'user' => auth()->user(),
             'contactuser' => $contactuser
             ]);
    }

     public function personalmessagescontacts()
    {
         return view('user.profile.contactuser.personal_mailcontacts',[
             'user' => auth()->user()
             ]);
    }

     public function personalmessagescontactsshow(contactuser $contactuser)
    {
         return view('user.profile.contactuser.personal_mailcontacts_show',[
             'user' => auth()->user(),
             'contactuser' => $contactuser
             ]);
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

    public function personalmessagesdelete(contactuser $contactuser,$id)
     {
         $contactuser = contactuser::findOrFail($id);
         $this->authorize('update',$contactuser);
         if (auth()->user()->id === $contactuser->user_id){
             $contactuser->delete();
             return ['message' => 'message deleted '];
         }else{
          abort(404);
         }

     }
}

