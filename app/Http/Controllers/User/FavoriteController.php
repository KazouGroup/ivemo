<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\activitycity;
use App\Models\annoncelocation;
use App\Models\annoncereservation;
use App\Models\annoncevente;
use App\Models\blogannoncelocation;
use App\Models\blogannoncereservation;
use App\Models\blogannoncevente;
use App\Models\comment;
use App\Models\employment;
use App\Models\favorite;
use App\Models\forum;
use App\Models\responsecomment;
use App\Models\user;
use App\Services\HelpersService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FavoriteController extends Controller
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

    public function sitefavoritemployment(user $user)
    {
        $this->authorize('update',$user);

        return view ('user.profile.privatefavorite',[
            'user' => $user,
        ]);
    }

    public function sitefavoritforum(user $user)
    {
        $this->authorize('update',$user);

        return view ('user.profile.privatefavorite',[
            'user' => $user,
        ]);
    }

    public function apipersonalfavoritesuses()
    {
        $user = Auth::user();

        $this->authorize('update',$user);

        $favoritemployments = HelpersService::helpersfavoritescount($user)
            ->with(['favoritesemployments' => function ($q) use ($user){
                $q->with('favoriteable','user')
                    ->where('favoriteable_type',employment::class)
                    ->with(['favoriteable.categoryemployment' => function ($q){
                        $q->where('status',1)->distinct()->get();},
                        'favoriteable.city' => function ($q){
                            $q->where('status',1)->distinct()->get();},
                        'favoriteable.member' => function ($q){
                            $q->distinct()->get();},
                        'favoriteable.user' => function ($q){
                            $q->distinct()->get();}])
                    ->orderBy('created_at','DESC')->get()->toArray()
                ;},
            ])
            ->with(['favoritesforums' => function ($q) use ($user){
                $q->with('favoriteable','user')
                    ->where('favoriteable_type',forum::class)
                    ->with(['favoriteable.categoryforum' => function ($q){
                        $q->where('status',1)->distinct()->get();},
                        'favoriteable.user' => function ($q){
                            $q->distinct()->get();}])
                    ->orderBy('created_at','DESC')->get()->toArray()
                ;},
            ])->first();


        return response()->json($favoritemployments, 200);
    }

    /**
     * @param Request $request
     * @param forum $forum
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function favoriteforum(Request $request,forum $forum)
    {
        $forum->favorites()->create($request->all());

        return response('Like',Response::HTTP_ACCEPTED);
    }

    public function unfavoriteforum(Request $request,forum $forum)
    {
        auth()->user()->removefavorites()->detach($forum->id);

        return response('Unlike',Response::HTTP_ACCEPTED);
    }

    /**
     * @param Request $request
     * @param employment $employment
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function favoritemployment(Request $request,$employment)
    {
        $employment = employment::whereId($employment)->firstOrFail();

        $employment->favorites()->create($request->all());

        return response('Favorite',Response::HTTP_ACCEPTED);
    }

    public function unfavoritemployment(Request $request,$employment)
    {
        $employment = employment::whereId($employment)->firstOrFail();

        auth()->user()->removefavorites()->detach($employment);

        return response('Favorite move',Response::HTTP_ACCEPTED);
    }

    /**
     * @param Request $request
     * @param annoncelocation $annoncelocations
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function favoritannoncelocation(Request $request,$annoncelocation)
    {
        $annoncelocation = annoncelocation::whereId($annoncelocation)->firstOrFail();

        $annoncelocation->favorites()->create($request->all());

        return response('Favorite',Response::HTTP_ACCEPTED);
    }

    public function unfavoritannoncelocation(Request $request,$annoncelocation)
    {
        $annoncelocation = annoncelocation::whereId($annoncelocation)->firstOrFail();

        auth()->user()->removefavorites()->detach($annoncelocation);

        return response('Favorite move',Response::HTTP_ACCEPTED);
    }

    /**
     * @param Request $request
     * @param annoncevente $annoncevente
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function favoritannoncevente(Request $request,$annoncevente)
    {
        $annoncevente = annoncevente::whereId($annoncevente)->firstOrFail();

        $annoncevente->favorites()->create($request->all());

        return response('Favorite',Response::HTTP_ACCEPTED);
    }

    public function unfavoritannoncevente(Request $request,$annoncevente)
    {
        $annoncevente = annoncevente::whereId($annoncevente)->firstOrFail();

        auth()->user()->removefavorites()->detach($annoncevente);

        return response('Favorite move',Response::HTTP_ACCEPTED);
    }

    /**
     * @param Request $request
     * @param annoncereservation $annoncereservation
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function favoritannoncereservation(Request $request,$annoncereservation)
    {
        $annoncereservation = annoncereservation::whereId($annoncereservation)->firstOrFail();

        $annoncereservation->favorites()->create($request->all());

        return response('Favorite',Response::HTTP_ACCEPTED);
    }

    public function unfavoritannoncereservation(Request $request,$annoncereservation)
    {
        $annoncereservation = annoncevente::whereId($annoncereservation)->firstOrFail();

        auth()->user()->removefavorites()->detach($annoncereservation);

        return response('Favorite move',Response::HTTP_ACCEPTED);
    }

    /**
     * @param Request $request
     * @param blogannoncelocation $blogannoncelocation
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function favoritblogannoncelocation(Request $request,$blogannoncelocation)
    {
        $blogannoncelocation = blogannoncelocation::whereId($blogannoncelocation)->firstOrFail();

        $blogannoncelocation->favorites()->create($request->all());

        return response('Favorite',Response::HTTP_ACCEPTED);
    }

    public function unfavoritblogannoncelocation(Request $request,$blogannoncelocation)
    {
        $blogannoncelocation = blogannoncelocation::whereId($blogannoncelocation)->firstOrFail();

        $response = auth()->user()->removefavorites()->detach($blogannoncelocation);

        return response()->json(['success'=>$response]);
    }

    /**
     * @param Request $request
     * @param blogannoncevente $blogannoncevente
     * @return
     */
    public function favoritblogannoncevente(Request $request,$blogannoncevente)
    {
        $blogannoncevente = blogannoncevente::whereId($blogannoncevente)->firstOrFail();

        $response = $blogannoncevente->favorites()->create($request->all());

        return response()->json(['success'=>$response]);
    }

    public function unfavoritblogannoncevente(Request $request,$blogannoncevente)
    {
        $blogannoncevente = blogannoncevente::whereId($blogannoncevente)->firstOrFail();

        $response = auth()->user()->removefavorites()->detach($blogannoncevente);

        return response()->json(['success'=>$response]);
    }

    /**
     * @param Request $request
     * @param blogannoncereservation $blogannoncereservation
     * @return
     */
    public function favoritblogannoncereservation(Request $request,$blogannoncereservation)
    {
        $blogannoncereservation = blogannoncereservation::whereId($blogannoncereservation)->firstOrFail();

        $response = $blogannoncereservation->favorites()->create($request->all());

        return response()->json(['success'=>$response]);
    }

    public function unfavoritblogannoncereservation(Request $request,$blogannoncereservation)
    {
        $blogannoncereservation = blogannoncereservation::whereId($blogannoncereservation)->firstOrFail();

        $response = auth()->user()->removefavorites()->detach($blogannoncereservation);

        return response()->json(['success'=>$response]);
    }

    /**
     * @param Request $request
     * @param activitycity $activitycity
     * @return
     */
    public function favoritactivitycity(Request $request,$activitycity)
    {
        $activitycity = activitycity::whereId($activitycity)->firstOrFail();

        $response = $activitycity->favorites()->create($request->all());

        return response()->json(['success'=>$response]);
    }

    public function unfavoritactivitycity(Request $request,$activitycity)
    {
        $activitycity = activitycity::whereId($activitycity)->firstOrFail();

        $response = auth()->user()->removefavorites()->detach($activitycity);

        return response()->json(['success'=>$response]);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        $this->authorize('update',$user);

        $favorite = favorite::where('id', $id)->findOrFail($id);

        $favorite->delete();
    }

}
