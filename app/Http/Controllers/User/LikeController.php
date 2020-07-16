<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\comment;
use App\Model\forum;
use App\Model\responsecomment;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller
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
     * @param comment $comment
     * @return \Illuminate\Http\JsonResponse
     */

    public function likecomment(Request $request,comment $comment)
    {

        $like = $comment->likes()->create($request->all());

        return response()->json($like,200);
    }

    public function unlikecomment(Request $request,comment $comment)
    {
        $like =  auth()->user()->removelikes()->detach($comment->id);

        return response()->json($like,200);
    }

    /**
     * @param Request $request
     * @param forum $forum
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function likeforum(Request $request,forum $forum)
    {
        $forum->likes()->create($request->all());

        return response('Like',Response::HTTP_ACCEPTED);
    }

    public function unlikeforum(Request $request,forum $forum)
    {
        auth()->user()->removelikes()->detach($forum->id);

        return response('Unlike',Response::HTTP_ACCEPTED);
    }

    /**
     * @param Request $request
     * @param responsecomment $responsecomment
     * @return \Illuminate\Http\JsonResponse
     */
    public function likeresponsecomment(Request $request,responsecomment $responsecomment)
    {

        $like = $responsecomment->likes()->create($request->all());

        return response()->json($like,200);
    }

    public function unlikeresponsecomment(Request $request,responsecomment $responsecomment)
    {
        $like =  auth()->user()->removelikes()->detach($responsecomment->id);

        return response()->json($like,200);
    }
}
