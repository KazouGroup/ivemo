<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\Http\Requests\Profile\UpdateprofileRequest;
use App\Http\Requests\Profile\UpdateRequest;
use App\Http\Resources\UserResource;
use App\Model\contactuser;
use App\model\profile;
use App\Model\reservation;
use App\Model\user;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        $this->middleware('auth',['except' => ['api']]);
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


    public function api_user_account(user $user)
    {
       $user = user::whereSlug($user->slug)
            ->withCount(['contactusers' => function ($q){
                $q->where('status_red',1);
            }])
            ->first();

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

    public function apipersonalmessagescontacts(user $user)
    {

        if (auth()->user()->id === $user->id){

            $contactusers = user::whereSlug($user->slug)
                ->with(['contactusers' => function ($q) use ($user){
                    $q->whereIn('user_id',[$user->id])
                        ->distinct()->get()->toArray()
                    ;},
                ])
                ->withCount(['contactusers' => function ($q){
                    $q->where('status_red',1);
                }])
                ->first();

            return response()->json($contactusers, 200);
        }else{
            return redirect()->back();
        }

    }

    public function apipersonalmessagescontactsshow(user $user,contactuser $contactuser)
    {
        $this->authorize('update',$contactuser);

        $contactusers = contactuser::with('user')->whereSlug($contactuser->slug)->first();


        return response()->json($contactusers, 200);
    }

    public function apipersonalmessagesannonces_locations_show($user,contactuser $contactuser)
    {
        $contactusers = ProfileService::apipersonalmessagesannonces_locations_show($contactuser);

        return response()->json($contactusers, 200);
    }

    public function api_user_profile_account($user)
    {
        $user = user::whereSlug($user)
            ->with(['profile' => function ($q) use ($user){
                $q->whereIn('user_id',[auth()->user()->id])
                    ->distinct()->get()->toArray()
                ;},
            ])
            ->withCount(['teamusers' => function ($q) use ($user){
                $q->whereIn('user_id',[auth()->user()->id]);
            }])->withCount(['annoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->first();

        return response()->json($user, 200);
    }

    public function apipersonalmessagesannonces_locations(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusers = ProfileService::apipersonalmessagesannonces_locations($user);

            return response()->json($contactusers, 200);
        }else{
            abort(404);
        }

    }

    public function apipersonalmessagesannonces_reservations()
    {
        $contactusers = ProfileService::apipersonalmessagesannonces_reservations();

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

    public function personalmessagesannonces_locations(user $user)
    {
         return view('user.profile.contactuser.personal_mailannonces_locations',[
             'user' => auth()->user()
             ]);
    }

     public function personalmessagesannonces_locations_show(contactuser $contactuser)
    {
        $this->authorize('update',$contactuser);

         return view('user.profile.contactuser.personal_mailannonces_locations_show',[
             'user' => auth()->user(),
             'contactuser' => $contactuser
             ]);
    }

     public function personalmessagescontacts(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.contactuser.personal_mailcontacts',[
                'user' => auth()->user()
            ]);
        }else{
            return abort(404);
        }

    }

     public function personalmessagescontactsshow($user,contactuser $contactuser)
    {
        $this->authorize('update',$contactuser);

         return view('user.profile.contactuser.personal_mailcontacts_show',[
             'user' => auth()->user(),
             'contactuser' => $contactuser
             ]);
    }


    public function personalmessagescontactsactive($id)
    {
         $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuser);

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

    public function profile_add_info_account_update(UpdateprofileRequest $request ,profile $profile)
    {
        $this->authorize('update',$profile);

        $profile = $profile->update($request->all());

        return response()->json($profile,200);
    }

    public function profile_add_info_account(profile $profile)
    {
        $user = auth()->user();
        return view('user.profile.profile_account',[
            'user' => $user,
        ]);
    }

    public function profile_account_update(UpdateRequest $request)
    {
        $user = auth()->user();

        $data = $user->update($request->only(
            'first_name',
            'last_name',
            'email',
            'slug',
            'username',
            'phone',
            'categoryprofile_id',
            'sex',
            'color_name'
        ));
        return response()->json($data,200);

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

