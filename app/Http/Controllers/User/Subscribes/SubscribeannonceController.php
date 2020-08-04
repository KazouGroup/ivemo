<?php

namespace App\Http\Controllers\User\Subscribes;

use App\Http\Controllers\Controller;
use App\Model\abonne\subscribeannonce;
use App\Model\abonne\subscribeforum;
use App\Model\user;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubscribeannonceController extends Controller
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

    public function subscribe(Request $request,$id)
    {
        $user = user::whereId($id)->firstOrFail();

        auth()->user()->putsubscribannonces()->toggle($user->id);


		return response('Success ',Response::HTTP_ACCEPTED);
	}
}
