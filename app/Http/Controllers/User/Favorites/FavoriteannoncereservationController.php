<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\blogannoncelocation;
use App\Model\user;
use App\Model\favorite\favoritemployment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FavoriteannoncereservationController extends Controller
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

    public function favoriteannoncereservation(user $user)
    {
        return view ('user.profile.annonces.privatefavoriteannonces',[
            'user' => $user,
        ]);
    }

     public function apiuserdatafavoriteannoncelocation(user $user)
    {
        $this->authorize('update',$user);

        $favoriteannoncelocations = $user->favoriteannoncelocations()->with('user','annoncereservation')
            ->whereIn('user_id',[$user->id])
            ->with(['annoncereservation.categoryannoncelocation' => function ($q){
                $q->distinct()->get();},
                'annoncereservation.city' => function ($q){
                    $q->distinct()->get();},
                'annoncereservation.annoncetype' => function ($q){
                    $q->distinct()->get();},
                'annoncereservation.member' => function ($q){
                    $q->distinct()->get();},
                'annoncereservation.user' => function ($q){
                    $q->distinct()->get();}
            ])
            ->whereHas('annoncereservation', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
            ->whereHas('annoncereservation.city', function ($q) {$q->where('status',1);})
            ->whereHas('annoncereservation.categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->get();

        return response()->json($favoriteannoncelocations, 200);
    }

    public function favorite(Request $request,$id)
    {
        $annoncereservation = annoncereservation::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteannoncereservations()->attach($annoncereservation->id);

		return response('favorite confirmed',Response::HTTP_ACCEPTED);
	}

    public function unfavorite(Request $request,$id)
    {
        $annoncereservation = annoncereservation::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteannoncereservations()->detach($annoncereservation->id);

		return response('unfavorite confirmed',Response::HTTP_ACCEPTED);
	}
}
