<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Model\employment;
use App\Model\user;
use App\Model\favorite\favoritemployment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FavoritemploymentController extends Controller
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

    public function favoritemployment(user $user)
    {
        return view ('user.profile.employments.privatefavoritemployments',[
            'user' => $user,
        ]);
    }

     public function apiuserdatafavoritemployment(user $user)
    {
        $this->authorize('update',$user);

        $favoritemployments = $user->favoritemployments()->with('user','employment')
            ->whereIn('user_id',[$user->id])
            ->with(['employment.categoryemployment' => function ($q){
                $q->distinct()->get();},
                'employment.city' => function ($q){
                    $q->distinct()->get();},
                'employment.member' => function ($q){
                    $q->distinct()->get();},
                'employment.user' => function ($q){
                    $q->distinct()->get();}
            ])
            ->whereHas('employment', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
            ->whereHas('employment.city', function ($q) {$q->where('status',1);})
            ->whereHas('employment.categoryemployment', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->get();

        return response()->json($favoritemployments, 200);
    }

    public function favorite(Request $request,$id)
    {
        $employment = employment::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoritemployments()->attach($employment->id);

		return response('favorite confirmed',Response::HTTP_ACCEPTED);
	}

    public function unfavorite(Request $request,$id)
    {
        $employment = employment::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoritemployments()->detach($employment->id);

		return response('unfavorite confirmed',Response::HTTP_ACCEPTED);
	}
}
