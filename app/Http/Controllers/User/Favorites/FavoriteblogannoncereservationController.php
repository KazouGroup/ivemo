<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Model\blogannoncereservation;
use App\Model\favorite\favoriteblogannoncereservation;
use App\Model\user;
use App\Model\favorite\favoritemployment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FavoriteblogannoncereservationController extends Controller
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

    public function favoriteblogannoncereservation(user $user)
    {
        return view ('user.profile.blogs.favoritfavoriteblogannoncereservation',[
            'user' => $user,
        ]);
    }

     public function apiuserdatafavoritfavoriteblogannoncereservation(user $user)
    {
        $this->authorize('update',$user);

        $favoriteblogannoncereservations = $user->favoriteblogannoncereservations()->with('user','blogannoncereservation')
            ->whereIn('user_id',[$user->id])
            ->with(['blogannoncereservation.categoryannoncereservation' => function ($q){
                $q->distinct()->get();},
                'blogannoncereservation.member' => function ($q){
                    $q->distinct()->get();},
                'blogannoncereservation.user' => function ($q){
                    $q->distinct()->get();}
            ])
            ->whereHas('blogannoncereservation', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
            ->whereHas('blogannoncereservation.categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->get();

        return response()->json($favoriteblogannoncereservations, 200);
    }

    public function favorite(Request $request,$id)
    {
        $blogannoncereservation = blogannoncereservation::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteblogannoncereservations()->attach($blogannoncereservation->id);

		return response('favorite confirmed',Response::HTTP_ACCEPTED);
	}

    public function unfavorite(Request $request,$id)
    {
        $blogannoncereservation = blogannoncereservation::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteblogannoncereservations()->detach($blogannoncereservation->id);

		return response('unfavorite confirmed',Response::HTTP_ACCEPTED);
	}


    public function likedata(Request $request,$id){

        $blogannoncereservation = blogannoncereservation::whereId($id)->firstOrFail();

        $response = auth()->user()->putlikedblogannoncereservations()->attach($blogannoncereservation->id);

        return response()->json(['success'=>$response]);
    }

    public function unlikedata(Request $request,$id){

        $blogannoncereservation = blogannoncereservation::whereId($id)->firstOrFail();

        $response = auth()->user()->putlikedblogannoncereservations()->detach($blogannoncereservation->id);

        return response()->json(['success'=>$response]);
    }
}
