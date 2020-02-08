<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\teamuser;
use App\Model\user;
use Illuminate\Http\Request;

class TeamuserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'api','apiteamuserpublique',
        ]]);
    }

    public function apiteamuserpublique(user $user)
    {
        $teamusers = teamuser::whereIn('user_id',[$user->id])
        ->orderBy('created_at','DESC')
        ->where('status',1)->get()->toArray();
        return response()->json($teamusers, 200);
    }


    public function apiteamuserprivate()
    {
        $teamusers = teamuser::whereIn('user_id',[auth()->user()->id])
        ->orderBy('created_at','DESC')->get()->toArray();
        return response()->json($teamusers, 200);
    }


    public function team_users()
    {
        return view('user.teamuser.index',[
            'user'=> auth()->user(),
        ]);
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
