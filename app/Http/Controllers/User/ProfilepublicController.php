<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StoreRequest;
use App\Http\Resources\UserResource;
use App\Models\annoncetype;
use App\Models\contactuser;
use App\Models\user;
use App\Services\Contactusers\ContactuserService;
use App\Services\ProfileService;

class ProfilepublicController extends Controller
{



    public function apiprofilepublique(user $user)
    {
        $user = new UserResource(ProfileService::apiprofilepublique($user));

        return response()->json($user, 200);
    }

    public function apiprofilannoncelocations(user $user,annoncetype $annoncetype)
    {

        $userannoncelocations = ProfileService::apiprofilannoncelocations($user,$annoncetype);

        return response()->json($userannoncelocations, 200);
    }

    public function apiprofilannoncereservations(user $user)
    {

        $annoncesreservations = ProfileService::apiprofilannoncereservations($user);

        return response()->json($annoncesreservations, 200);
    }

    public function apiprofilannoncereserventes(user $user,annoncetype $annoncetype)
    {
        $annoncesreservations = ProfileService::apiprofilannoncereserventes($user,$annoncetype);

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

    public function apiprofilemployments(user $user)
    {
        $employments = ProfileService::apiprofilemployments($user);

        return response()->json($employments, 200);
    }

    public function apiprofilforums(user $user)
    {
        $forums = ProfileService::apiprofilforums($user);

        return response()->json($forums, 200);
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


    public function public_profile_agences_send_message(StoreRequest $request)
    {
        $contactuser = new contactuser();

        $slug = sha1(('YmdHis') . str_random(30));
        $contactuser->fill($request->all());
        $contactuser->slug = $slug;

        $contactuser->save();

        return response()->json($contactuser,200);
    }


    public function public_profile(user $user)
    {
        return view('user.profile.profile_account',[
            'user' => $user,
        ]);
    }

    public function userpublic_profile(user $user)
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

    public function profilemployments(user $user)
    {
        return view('user.profile.employments.privateprofilemployments',[
            'user' => $user,
        ]);
    }

    public function profilforums(user $user)
    {
        return view('user.profile.forums.privateprofilforum',[
            'user' => $user,
        ]);
    }

}
