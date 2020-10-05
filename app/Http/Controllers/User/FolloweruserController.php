<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\FolloweruserResource;
use App\Http\Resources\UserResource;
use App\Models\abonne\subscribemployment;
use App\Models\user;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FolloweruserController extends Controller
{

      /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['only' => ['followeruser']]);
    }


    public function apifilfollowers(user $user)
    {
        $users =  FolloweruserResource::collection($user->followerusers()->with('user','member')
            ->orderByDesc('created_at')->get());

        return response()->json($users, 200);
    }

    public function apifilfollowing(user $user)
    {
        $users =  FolloweruserResource::collection($user->followingusers()->with('user','member')
            ->orderByDesc('created_at')->get());

        return response()->json($users, 200);
    }

	public function profilfollowers(user $user)
    {
        return view('user.followeruser.followers',[
            'user' => $user,
        ]);
    }

	public function userprofilfollowers(user $user)
    {
        return view('user.followeruser.followers',[
            'user' => $user,
        ]);
    }

	public function profilfollowing(user $user)
    {
        return view('user.followeruser.following',[
            'user' => $user,
        ]);
    }

	public function userprofilfollowing(user $user)
    {
        return view('user.followeruser.following',[
            'user' => $user,
        ]);
    }


    public function followeruser(Request $request,$id)
    {
        $user = user::whereId($id)->firstOrFail();

        auth()->user()->putfollowerusers()->toggle($user->id);

        return response('Success ',Response::HTTP_ACCEPTED);
    }
}
