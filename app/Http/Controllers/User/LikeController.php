<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\model\comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
