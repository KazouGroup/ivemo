<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\comment;
use App\Model\responsecomment;
use Illuminate\Http\Request;

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
