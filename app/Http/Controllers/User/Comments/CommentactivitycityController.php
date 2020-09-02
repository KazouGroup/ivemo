<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\Comment\CommentActivitycityResource;
use App\Model\activitycity;
use App\Model\city;
use App\Model\comment;
use App\Model\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class CommentactivitycityController extends Controller
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


    public function getcomment(city $city,activitycity $activitycity)
    {
        $comments = CommentActivitycityResource::collection($activitycity->comments()
            ->with('user','commentable','responsecomments')
            ->whereIn('commentable_id',[$activitycity->id])
            ->where('status',1)
            ->where('commentable_type',activitycity::class)
            ->with(['responsecomments' => function ($q){
                $q->where('status',1)->with('user','comment')->orderByDesc('created_at')
                    ->distinct()->get()
                ;},
            ])->orderByDesc('created_at')->distinct()->get());

        return response()->json($comments,200);
    }

    public function sendcomment(Request $request,city $city,activitycity $activitycity)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $activitycity->comments()->create($request->all());

        return response()->json($comment,200);
    }



    public function updatecomment(Request $request,city $city,activitycity $activitycity,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($activitycity,200);
    }

    public function sendresponsecomment(Request $request,city $city,activitycity $activitycity,comment $comment)
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
