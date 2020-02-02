<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnoncetypeResource;
use App\Http\Resources\UserResource;
use App\Model\annoncereservation;
use App\Model\annoncetype;
use App\Model\user;
use Illuminate\Http\Request;

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
            'api','apiprofilepublique','apiannoncereservationbyprofilpublique'
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
        $annoncereservations = annoncereservation::whereIn('user_id',[$user->id])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncereservation','city','annoncetype')->latest()->get();

        return response()->json($annoncereservations, 200);
    }
     /**
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
