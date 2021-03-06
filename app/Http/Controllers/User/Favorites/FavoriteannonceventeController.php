<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Models\annoncevente;
use App\Models\user;
use Illuminate\Http\Request;

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

        $response = auth()->user()->bookmarksfavoriteannonceventes()->toggle($annoncevente->id);

        return response()->json(['success'=>$response]);
	}

}
