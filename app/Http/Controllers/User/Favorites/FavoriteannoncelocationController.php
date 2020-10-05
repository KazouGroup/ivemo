<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Models\annoncelocation;
use App\Models\user;
use Illuminate\Http\Request;

class FavoriteannoncelocationController extends Controller
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

    public function favoriteannoncelocation(user $user)
    {
        return view ('user.profile.annonces.privatefavoriteannonces',[
            'user' => $user,
        ]);
    }

     public function apiuserdatafavoriteannoncelocation(user $user)
    {
        $this->authorize('update',$user);

        $favoriteannoncelocations = $user->favoriteannoncelocations()->with('user','annoncelocation')
            ->whereIn('user_id',[$user->id])
            ->with(['annoncelocation.categoryannoncelocation' => function ($q){
                $q->distinct()->get();},
                'annoncelocation.city' => function ($q){
                    $q->distinct()->get();},
                'annoncelocation.annoncetype' => function ($q){
                    $q->distinct()->get();},
                'annoncelocation.member' => function ($q){
                    $q->distinct()->get();},
                'annoncelocation.user' => function ($q){
                    $q->distinct()->get();}
            ])
            ->whereHas('annoncelocation', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
            ->whereHas('annoncelocation.city', function ($q) {$q->where('status',1);})
            ->whereHas('annoncelocation.categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->get();

        return response()->json($favoriteannoncelocations, 200);
    }

    public function favorite(Request $request,$id)
    {
        $annoncelocation = annoncelocation::whereId($id)->firstOrFail();

        $response = auth()->user()->bookmarksfavoriteannoncelocations()->toggle($annoncelocation->id);

        return response()->json(['success'=>$response]);	}
}
