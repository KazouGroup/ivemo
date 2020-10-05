<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\city;
use App\Models\comment;
use App\Models\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class CommentcityController extends Controller
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


    public function getcomment(city $city)
    {
        $comments = CommentResource::collection($city->comments()
            ->with('user','commentable','responsecomments')
            ->whereIn('commentable_id',[$city->id])
            ->where('status',1)
            ->where('commentable_type',city::class)
            ->with(['responsecomments' => function ($q){
                $q->where('status',1)->with('user','comment')->orderByDesc('created_at')
                    ->distinct()->get()
                ;},
            ])->orderByDesc('created_at')->distinct()->get());

        return response()->json($comments,200);
    }

    public function sendcomment(Request $request,city $city)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $city->comments()->create($request->all());

        return response()->json($comment,200);
    }



    public function updatecomment(Request $request,city $city,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($city,200);
    }

    public function sendresponsecomment(Request $request,city $city,comment $comment)
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
