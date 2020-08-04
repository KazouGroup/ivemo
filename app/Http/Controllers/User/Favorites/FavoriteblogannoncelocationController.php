<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Model\blogannoncelocation;
use App\Model\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FavoriteblogannoncelocationController extends Controller
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

    public function favoriteblogannoncelocation(user $user)
    {
        return view ('user.profile.blogs.favoritfavoriteblogannoncelocation',[
            'user' => $user,
        ]);
    }

     public function apiuserdatafavoriteblogannoncelocation(user $user)
    {
        $this->authorize('update',$user);

        $favoritemployments =  $user->favoriteblogannoncelocations()->with('user','blogannoncelocation')
            ->whereIn('user_id',[$user->id])
            ->with(['blogannoncelocation.categoryannoncelocation' => function ($q){
                $q->distinct()->get();},
                'blogannoncelocation.member' => function ($q){
                    $q->distinct()->get();},
                'blogannoncelocation.user' => function ($q){
                    $q->distinct()->get();}
            ])
            ->whereHas('blogannoncelocation', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
            ->whereHas('blogannoncelocation.categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->get();

        return response()->json($favoritemployments, 200);
    }

    public function favorite(Request $request,$id)
    {
        $blogannoncelocation = blogannoncelocation::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteblogannoncelocations()->attach($blogannoncelocation->id);

		return response('favorite confirmed',Response::HTTP_ACCEPTED);
	}

    public function unfavorite(Request $request,$id)
    {
        $blogannoncelocation = blogannoncelocation::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteblogannoncelocations()->detach($blogannoncelocation->id);

		return response('unfavorite confirmed',Response::HTTP_ACCEPTED);
	}

}
