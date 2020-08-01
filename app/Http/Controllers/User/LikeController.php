<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\annoncelocation;
use App\Model\blogannoncelocation;
use App\Model\comment;
use App\Model\employment;
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
     * @param employment $employment
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function likemployment(Request $request,employment $employment)
    {
        $employment->likes()->create($request->all());

        return response('Like',Response::HTTP_ACCEPTED);
    }

    public function unlikemployment(Request $request,employment $employment)
    {
        auth()->user()->removelikes()->detach($employment->id);

        return response('Unlike',Response::HTTP_ACCEPTED);
    }

    /**
     * @param Request $request
     * @param annoncelocation $annoncelocation
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function likannoncelocation(Request $request,annoncelocation $annoncelocation)
    {
        $annoncelocation->likes()->create($request->all());

        return response('Like',Response::HTTP_ACCEPTED);
    }

    public function unlikannoncelocation(Request $request,annoncelocation $annoncelocation)
    {
        auth()->user()->removelikes()->detach($annoncelocation->id);

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

    /**
     * @param Request $request
     * @param responsecomment $responsecomment
     * @return \Illuminate\Http\JsonResponse
     */
    public function likblogannoncelocation(Request $request,$id)
    {

        $blogannoncelocation = blogannoncelocation::whereId($id)->firstOrFail();


        $response = $blogannoncelocation->likes()->create($request->all());

        return response()->json(['success'=>$response]);
    }

    public function unlikablognnoncelocation(Request $request,$id)
    {

        $blogannoncelocation = blogannoncelocation::whereId($id)->firstOrFail();

        $response = auth()->user()->removelikes()->detach($blogannoncelocation->id);

        return response()->json(['success'=>$response]);
    }
}
