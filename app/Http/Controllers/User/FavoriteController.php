<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\comment;
use App\Model\employment;
use App\Model\favorite;
use App\Model\forum;
use App\Model\responsecomment;
use App\Model\user;
use Illuminate\Http\Request;
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

    public function destroy(user $user,$id)
    {
        $favorite = favorite::where('id', $id)->findOrFail($id);

        $this->authorize('update',$user);

        $favorite->delete();
    }

}
