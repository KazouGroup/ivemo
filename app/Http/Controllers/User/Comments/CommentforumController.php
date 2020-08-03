<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Model\comment;
use App\Model\forum;
use App\Model\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class CommentforumController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'getcomment',
        ]]);
    }


    public function getcomment($categoryforum,$user,forum $forum)
    {
        $comments = CommentResource::collection($forum->comments()
            ->with('user','commentable','responsecomments')
            ->whereIn('commentable_id',[$forum->id])
            ->where('status',1)
            ->with(['responsecomments' => function ($q){
                $q->where('status',1)->with('user','comment')->orderByDesc('created_at')
                    ->distinct()->get()
                ;},
            ])->orderByDesc('created_at')->distinct()->get());

        return response()->json($comments,200);
    }

    public function sendcomment(Request $request,$categoryforum,$user,forum $forum)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $forum->comments()->create($request->all());

        CommentAndResponseService::newEmailTonewcommentforumpageShow($request,$forum);

        return response()->json($comment,200);
    }



    public function updatecomment(Request $request,$categoryforum,$user,forum $forum,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($forum,200);
    }

    public function sendresponsecomment(Request $request,$categoryforum,$user,forum $forum,comment $comment)
    {
        $validatedData = $request->validate(['body' => 'required|min:2|max:5000']);

        $responsecomment = responsecomment::create([
            'body' => $validatedData['body'],
            'comment_id' => $comment->id,
        ]);

        CommentAndResponseService::newEmailToresponsecommentpageShow($request,$comment);

        return $responsecomment->toJson();
    }

}
