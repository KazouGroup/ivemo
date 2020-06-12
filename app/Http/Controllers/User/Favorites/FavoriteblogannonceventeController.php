<?php

namespace App\Http\Controllers\User\Favorites;

use App\Http\Controllers\Controller;
use App\Model\blogannoncelocation;
use App\Model\blogannoncevente;
use App\Model\employment;
use App\Model\user;
use App\Model\favorite\favoritemployment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FavoriteblogannonceventeController extends Controller
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

    public function favoriteblogannoncevente(user $user)
    {
        return view ('user.profile.blogs.favoritfavoriteblogannoncevente',[
            'user' => $user,
        ]);
    }

     public function apiuserdatafavoriteblogannoncevente(user $user)
    {
        $this->authorize('update',$user);

        $favoritemployments = $user->favoriteblogannonceventes()->with('user','blogannoncevente')
            ->whereIn('user_id',[$user->id])
            ->with(['blogannoncevente.categoryannoncevente' => function ($q){
                $q->distinct()->get();},
                'blogannoncevente.member' => function ($q){
                    $q->distinct()->get();},
                'blogannoncevente.user' => function ($q){
                    $q->distinct()->get();}
            ])
            ->whereHas('blogannoncevente', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
            ->whereHas('blogannoncevente.categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->get();

        return response()->json($favoritemployments, 200);
    }

    public function favorite(Request $request,$id)
    {
        $blogannoncevente = blogannoncevente::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteblogannonceventes()->attach($blogannoncevente->id);

		return response('favorite confirmed',Response::HTTP_ACCEPTED);
	}

    public function unfavorite(Request $request,$id)
    {
        $blogannoncevente = blogannoncevente::whereId($id)->firstOrFail();

        Auth::user()->bookmarksfavoriteblogannonceventes()->detach($blogannoncevente->id);

		return response('unfavorite confirmed',Response::HTTP_ACCEPTED);
	}

    public function likedata(Request $request,$id){

        $blogannoncevente = blogannoncevente::whereId($id)->firstOrFail();

        $response = auth()->user()->putlikedblogannonceventes()->attach($blogannoncevente->id);

        return response()->json(['success'=>$response]);
    }

    public function unlikedata(Request $request,$id){

        $blogannoncevente = blogannoncevente::whereId($id)->firstOrFail();

        $response = auth()->user()->putlikedblogannonceventes()->detach($blogannoncevente->id);

        return response()->json(['success'=>$response]);
    }
}
