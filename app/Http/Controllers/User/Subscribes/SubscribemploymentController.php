<?php

namespace App\Http\Controllers\User\Subscribes;

use App\Http\Controllers\Controller;
use App\Model\abonne\subscribemployment;
use App\Model\user;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubscribemploymentController extends Controller
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

    public function apiusersubscribes()
    {
        $user = auth()->user();
        $subscribeblogannonces = subscribemployment::with('member','user')
            ->whereIn('user_id',[$user->id])
            ->distinct()->get();

        return response()->json($subscribeblogannonces, 200);
    }

    public function apiusersubscribed()
    {
        $user = auth()->user();
        $subscribeblogannonces = subscribemployment::with('member','user')
            ->whereIn('member_id',[$user->id])
            ->distinct()->get();

        return response()->json($subscribeblogannonces, 200);
    }

    public function apiusersubscribes_count()
    {
        $user = auth()->user();
        $subscribeblogannonces = subscribemployment::with('member','user')
            ->whereIn('user_id',[$user->id])
            ->distinct()->get()->count();

        return response()->json($subscribeblogannonces, 200);
    }

    public function apiusersubscribed_count()
    {
        $user = auth()->user();
        $subscribeblogannonces = subscribemployment::with('member','user')
            ->whereIn('member_id',[$user->id])
            ->distinct()->get()->count();

        return response()->json($subscribeblogannonces, 200);
    }

    public function subscribe(Request $request,$id)
    {
        $user = user::whereId($id)->firstOrFail();

        auth()->user()->putsubscribemployments()->toggle($user->id);


		return response('Success ',Response::HTTP_ACCEPTED);
	}
}
