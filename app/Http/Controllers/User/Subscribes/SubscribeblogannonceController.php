<?php

namespace App\Http\Controllers\User\Subscribes;

use App\Http\Controllers\Controller;
use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SubscribeblogannonceController extends Controller
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

        Auth::user()->putsubscribeblogannonces()->attach($user->id);

		return response('Subscribe confirmed',Response::HTTP_ACCEPTED);
	}

    public function unsubscribe(Request $request,$id)
    {
        $user = user::whereId($id)->firstOrFail();

        Auth::user()->putsubscribeblogannonces()->detach($user->id);

		return response('Unsubscribe confirmed',Response::HTTP_ACCEPTED);
	}
}
