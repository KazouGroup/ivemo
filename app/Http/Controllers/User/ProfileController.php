<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StoreRequest;
use App\Http\Requests\PasswordRequest;
use App\Http\Requests\Profile\UpdateprofileRequest;
use App\Http\Resources\UserResource;
use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncetype;
use App\Model\annoncevente;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\contactuser;
use App\model\profile;
use App\Model\reservation;
use App\Model\user;
use App\Services\ContactuserService;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'apiannoncelocationbyprofilpublique','public_profile','publicprofilannoncereservations','apiprofilarticleslocations',
            'publicprofilannoncelocations','apiprofilannoncelocations','apiprofilannoncereservations',
            'apiprofilannoncereserventes','apiprofilarticlesreservations','apiprofilblogannoncelocations',
            'publicprofilarticleslocations','apiprofilblogannoncereservations','profilblogannoncereservations'
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
            ->withCount(['annoncelocations' => function ($q){
                $q->where('status',1);
            }])->withCount(['annoncereservations' => function ($q){
                $q->where('status',1);
            }])->withCount(['annonceventes' => function ($q){
                $q->where('status',1);
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->where('status',1);
            }])->withCount(['blogannoncereservations' => function ($q){
                $q->where('status',1);
            }])->first());

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
                        ->latest()->distinct()->get()->toArray();

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
        $userannoncelocations = ProfileService::apiprofilannoncelocations($user);

        return response()->json($userannoncelocations, 200);
    }

    public function apiprofilarticleslocations(user $user)
    {

        $userannoncelocations = blogannoncelocation::where('status',1)
            ->with('user','categoryannoncelocation')
            ->whereIn('user_id',[$user->id])
            ->distinct()->paginate(30)->toArray();

        return response()->json($userannoncelocations, 200);
    }

    public function apiprofilarticlesreservations(user $user)
    {

        $userannoncelocations = blogannoncereservation::where('status',1)
            ->with('user','categoryannoncereservation')
            ->whereIn('user_id',[$user->id])
            ->distinct()->paginate(30)->toArray();

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

        $annoncesreservations = ProfileService::apiprofilannoncereservations($user);

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
        $annoncesreservations = user::whereSlug($user->slug)
            ->with(['annonceventes' => function ($q) use ($user){
                $q->with('user','categoryannoncevente','city','annoncetype')
                    ->whereIn('annoncetype_id',[2])
                    ->whereIn('user_id',[$user->id])
                    ->where('status',1)
                    ->distinct()->paginate(40)->toArray()
                ;},
            ])
            ->withCount(['annoncelocations' => function ($q){
                $q->where('status',1);
            }])->withCount(['annoncereservations' => function ($q){
                $q->where('status',1);
            }])->withCount(['annonceventes' => function ($q){
                $q->where('status',1);
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->where('status',1);
            }])->withCount(['blogannoncereservations' => function ($q){
                $q->where('status',1);
            }])->first();

        return response()->json($annoncesreservations, 200);
    }


    public function apiprofilblogannoncelocations(user $user)
    {
        $personnalblogannonces = ProfileService::apiprofilblogannoncelocations($user);

        return response()->json($personnalblogannonces, 200);
    }

    public function publicprofilarticleslocations(user $user)
    {
        return view('user.profile.blogs.publicprofilblogannoncelocations',[
            'user' => $user,
        ]);
    }
    public function apiprofilblogannoncereservations(user $user)
    {

        $personnalblogannonces = ProfileService::apiprofilblogannoncereservations($user);

        return response()->json($personnalblogannonces, 200);
    }

    public function profilblogannoncereservations(user $user)
    {
        return view('user.profile.blogs.publicprofilannoncereservations',[
            'user' => $user,
        ]);
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
        $user = new UserResource(auth()->user());

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


    public function personalmessagescontactsactive($id)
    {
         $contactuser = contactuser::where('id', $id)->findOrFail($id);

         if(auth()->user()->id === $contactuser->user_id){
          $contactuser->update([ 'status_red' => 0,]);
          return response('read confirmed',Response::HTTP_ACCEPTED);
         }
    }

    public function api_profile_add_info_account(profile $profile)
    {
        $profile = profile::whereSlug($profile->slug)
            ->first();

        return response()->json($profile,200);
    }

    public function profile_add_info_account(profile $profile)
    {
        $user = auth()->user();
        return view('user.profile.profile_account',[
            'user' => $user,
        ]);
    }

    public function profile_add_info_account_update(UpdateprofileRequest $request,profile $profile)
    {

        $this->authorize('update',$profile);

        $profile = profile::findOrFail($profile->id);

        $profile->update($request->all());

        return response()->json($profile,200);
    }

    public function updatePassword(PasswordRequest $request)
    {
        $user = auth()->user()->update(['password' => Hash::make($request->get('password'))]);

        return response()->json($user,200);
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

