<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Models\teamuser;
use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PremiumteamuserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index(user $user)
    {
        $this->authorize('update',$user);

        return view('premium.team.index',compact('user'));
    }

    public function create(user $user)
    {
        $this->authorize('update',$user);

        return view('premium.team.index',compact('user'));
    }


    public function edit($user , teamuser $teamuser)
    {
        $this->authorize('update',$teamuser);

        return view('premium.team.show',[
            'teamuser'=> $teamuser,
        ]);
    }

    public function data(user $user)
    {
        $this->authorize('update',$user);

        $teamusers =  teamuser::with('user')
            ->whereIn('user_id',[$user->id])
            ->orderBy('created_at','DESC')
            ->distinct()->get()->toArray();

        return response()->json($teamusers,200);
    }

    public function datacount(user $user)
    {
        $this->authorize('update',$user);

        $teamusers =  DB::table('teamusers')
            ->whereIn('user_id',[$user->id])
            ->count();

        return response()->json($teamusers,200);
    }

    public function dataactivecount(user $user)
    {
        $this->authorize('update',$user);

        $teamusers =  DB::table('teamusers')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 1])
            ->count();

        return response()->json($teamusers,200);
    }

    public function dataunactivecount(user $user)
    {
        $this->authorize('update',$user);

        $teamusers =  DB::table('teamusers')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 0])
            ->count();

        return response()->json($teamusers,200);
    }



}
