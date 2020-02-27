<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StoreRequest;
use App\Http\Resources\UserResource;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\contactuser;
use App\Model\user;
use App\Services\ContactuserService;
use App\Services\ProfileService;
use Illuminate\Http\Request;

class ProfilepublicController extends Controller
{



    public function apiprofilepublique($user)
    {
        $user = new UserResource(user::whereSlug($user)
            ->withCount(['annoncelocations' => function ($q){
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
            }])->first());

        return response()->json($user, 200);
    }

    public function apiprofilannoncelocations(user $user)
    {

        $userannoncelocations = ProfileService::apiprofilannoncelocations($user);

        return response()->json($userannoncelocations, 200);
    }

    public function apiprofilannoncereservations(user $user)
    {

        $annoncesreservations = ProfileService::apiprofilannoncereservations($user);

        return response()->json($annoncesreservations, 200);
    }

    public function apiprofilannoncereserventes(user $user)
    {
        $annoncesreservations = ProfileService::apiprofilannoncereserventes($user);

        return response()->json($annoncesreservations, 200);
    }

    public function apiprofilblogannoncereservations(user $user)
    {

        $personnalblogannonces = ProfileService::apiprofilblogannoncereservations($user);

        return response()->json($personnalblogannonces, 200);
    }

    public function apiprofilblogannoncelocations(user $user)
    {
        $personnalblogannonces = ProfileService::apiprofilblogannoncelocations($user);

        return response()->json($personnalblogannonces, 200);
    }

    public function apiprofilblogannonceventes(user $user)
    {
        $personnalblogannonces = ProfileService::apiprofilblogannonceventes($user);

        return response()->json($personnalblogannonces, 200);
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


    public function public_profile(user $user)
    {
        return view('user.profile.profile_account',[
            'user' => $user,
        ]);
    }

    public function publicprofilannoncelocations(user $user)
    {
        return view('user.profile.annonces.publicprofilannoncelocations',[
            'user' => $user,
        ]);
    }

    public function publicprofilannoncereservations(user $user)
    {
        return view('user.profile.annonces.publicprofilannoncereservations',[
            'user' => $user,
        ]);
    }

    public function publicprofilannonceventes(user $user)
    {
        return view('user.profile.annonces.publicprofilannonceventes',[
            'user' => $user,
        ]);
    }

    public function publicprofilarticleslocations(user $user)
    {
        return view('user.profile.blogs.publicprofilblogannoncelocations',[
            'user' => $user,
        ]);
    }

    public function profilblogannoncereservations(user $user)
    {
        return view('user.profile.blogs.publicprofilannoncereservations',[
            'user' => $user,
        ]);
    }

    public function profilblogannonceventes(user $user)
    {
        return view('user.profile.blogs.publicprofilblogannonceventes',[
            'user' => $user,
        ]);
    }

}
