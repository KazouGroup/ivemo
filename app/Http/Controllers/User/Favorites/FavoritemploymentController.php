<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Model\employment;
use App\Model\favorite;
use App\Model\user;
use Illuminate\Http\Request;

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

        $favoritemployments = $user->favoritesemployments()
            ->whereIn('user_id',[$user->id])
            ->with('user','favoriteable')
            ->where('favoriteable_type',employment::class)
            ->with(['favoriteable.categoryemployment' => function ($q){
                    $q->where('status',1)->distinct()->get();},
                    'favoriteable.city' => function ($q){
                        $q->where('status',1)->distinct()->get();},
                    'favoriteable.member' => function ($q){
                        $q->distinct()->get();},
                    'favoriteable.user' => function ($q){
                        $q->distinct()->get();}])
            ->orderBy('created_at','DESC')->get();


        return response()->json($favoritemployments, 200);
    }

}
