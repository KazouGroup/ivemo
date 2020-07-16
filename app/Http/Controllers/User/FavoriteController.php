<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\comment;
use App\Model\forum;
use App\Model\responsecomment;
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

}
