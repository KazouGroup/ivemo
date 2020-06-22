<?php

namespace App\Http\Controllers\User\Subscribes;

use App\Http\Controllers\Controller;
use App\Model\abonne\subscribeblogannonce;
use App\Model\abonne\subscribemployment;
use App\Model\annoncelocation;
use App\Model\blogannoncelocation;
use App\Model\user;
use App\Model\favorite\favoritemployment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        Auth::user()->putsubscribemployments()->attach($user->id);

		return response('Subscribe confirmed',Response::HTTP_ACCEPTED);
	}

    public function unsubscribe(Request $request,$id)
    {
        $user = user::whereId($id)->firstOrFail();

        Auth::user()->putsubscribemployments()->detach($user->id);

		return response('Unsubscribe confirmed',Response::HTTP_ACCEPTED);
	}
}
