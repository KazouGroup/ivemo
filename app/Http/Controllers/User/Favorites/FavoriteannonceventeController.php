<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Model\annoncelocation;
use App\Model\annoncevente;
use App\Model\blogannoncelocation;
use App\Model\user;
use App\Model\favorite\favoritemployment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FavoriteannonceventeController extends Controller
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

    public function favoriteannoncevente(user $user)
    {
        return view ('user.profile.annonces.privatefavoriteannonces',[
            'user' => $user,
        ]);
    }

     public function apiuserdatafavoriteannoncevente(user $user)
    {
        $this->authorize('update',$user);

        $favoriteannonceventes = $user->favoriteannonceventes()->with('user','annoncevente')
            ->whereIn('user_id',[$user->id])
            ->with(['annoncevente.categoryannoncevente' => function ($q){
                $q->distinct()->get();},
                'annoncevente.city' => function ($q){
                    $q->distinct()->get();},
                'annoncevente.member' => function ($q){
                    $q->distinct()->get();},
                'annoncevente.annoncetype' => function ($q){
                    $q->distinct()->get();},
                'annoncevente.user' => function ($q){
                    $q->distinct()->get();}
            ])
            ->whereHas('annoncevente', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
            ->whereHas('annoncevente.city', function ($q) {$q->where('status',1);})
            ->whereHas('annoncevente.categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->get();

        return response()->json($favoriteannonceventes, 200);
    }

    public function favorite(Request $request,$id)
    {
        $annoncevente = annoncevente::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteannonceventes()->attach($annoncevente->id);

		return response('favorite confirmed',Response::HTTP_ACCEPTED);
	}

    public function unfavorite(Request $request,$id)
    {
        $annoncevente = annoncevente::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteannonceventes()->detach($annoncevente->id);

		return response('unfavorite confirmed',Response::HTTP_ACCEPTED);
	}
}
