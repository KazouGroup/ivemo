<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\Http\Requests\Profile\UpdateprofileRequest;
use App\Http\Requests\Profile\UpdateRequest;
use App\Http\Resources\UserResource;
use App\Model\contactuser;
use App\Model\profile;
use App\Model\reservation;
use App\Model\user;
use App\Services\HelpersService;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response;
use File;

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
       $user = HelpersService::helperscontactuserscount($user)->first();

        return response()->json($user, 200);

    }


    public function apiuserblogsannonces(user $user)
    {
        $this->authorize('update',$user);

        $user = HelpersService::helpersannonblogceteambyusercount($user)->first();

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


    public function apiprofileprivate(user $user)
    {
        $user = new UserResource(ProfileService::apiprofileprivate($user));

        return response()->json($user, 200);
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


     public function personalmessagesannonces_locations_show(contactuser $contactuser)
    {
        $this->authorize('update',$contactuser);

         return view('user.profile.contactuser.personal_mailannonces_locations_show',[
             'user' => auth()->user(),
             'contactuser' => $contactuser
             ]);
    }

    public function api_profile_add_info_account(profile $profile)
    {
        $profile = profile::whereSlug($profile->slug)
            ->first();

        return response()->json($profile,200);
    }

    public function profile_add_info_account_update(UpdateprofileRequest $request ,profile $profile)
    {
        $inputs = $request->all();

        $profile = $profile->update($inputs);

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
        /**
         * Avatr image upload
         */
        $currentPhoto = $user->avatar;
        if ($request->avatar != $currentPhoto){

            $namefile = sha1(date('YmdHis') . str_random(30));
            $name = $namefile .'.' . explode('/',explode(':',substr($request->avatar,0,strpos
                ($request->avatar,';')))[1])[1];

            $dir = 'assets/img/avatars/user/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            Image::make($request->avatar)->fit(200,123)->save(public_path('assets/img/avatars/user/').$name);


            $request->merge(['avatar' =>  "/assets/img/avatars/user/{$name}"]);

            // Ici on suprimme l'image existant
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }

        /**
         * Coverpage Uploade
         */
        $currentCoverPhoto = $user->avatarcover;
        if ($request->avatarcover != $currentCoverPhoto){

            $namefile = sha1(date('YmdHis') . str_random(30));
            $name = $namefile .'.' . explode('/',explode(':',substr($request->avatarcover,0,strpos
                ($request->avatarcover,';')))[1])[1];

            $dir = 'assets/img/avatarcovers/user/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            Image::make($request->avatarcover)->fit(1400,400)->save(public_path('assets/img/avatarcovers/user/').$name);


            $request->merge(['avatarcover' =>  "/assets/img/avatarcovers/user/{$name}"]);

            // Ici on suprimme l'image existant
            $oldCoverFilename = $currentCoverPhoto;
            File::delete(public_path($oldCoverFilename));
        }

        $user->update($request->only(
            'first_name',
            'last_name',
            'status_profile',
            'email',
            'slug',
            'username',
            'avatar',
            'avatarcover',
            'phone',
            'categoryprofile_id',
            'sex',
            'color_name'
        ));

        return ['message' => 'profile has ben updated'];

    }

    public function updatePassword(PasswordRequest $request)
    {
        $user = auth()->user()->update(['password' => Hash::make($request->get('password'))]);

        Auth::logout();
        // TODO: Redirect the user in the login page
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
     * @return array|\Illuminate\Http\Response
     */
    public function profile_account_delete($id)
    {
        $user = user::findOrFail($id);

        if (auth()->user()->id === $user->id){
            $oldFilename = $user->avatar;
            File::delete(public_path($oldFilename));
            $user->delete();
            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }

    }
}

