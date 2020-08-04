<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\abonne\subscribemployment;
use App\Model\user;
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
        $this->middleware('auth');
    }


    public function followeruser(Request $request,$id)
    {
        $user = user::whereId($id)->firstOrFail();

        auth()->user()->putfollowerusers()->toggle($user->id);


		return response('Success ',Response::HTTP_ACCEPTED);
	}
}
