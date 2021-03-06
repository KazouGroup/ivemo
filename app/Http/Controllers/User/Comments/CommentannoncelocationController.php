<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\annoncelocation;
use App\Models\annoncetype;
use App\Models\categoryannoncelocation;
use App\Models\city;
use App\Models\comment;
use App\Models\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class CommentannoncelocationController extends Controller
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


    public function getcomment(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$user,annoncelocation $annoncelocation)
    {
        $comments = CommentResource::collection($annoncelocation->comments()
            ->with('user','commentable','responsecomments')
            ->whereIn('commentable_id',[$annoncelocation->id])
            ->where('commentable_type',annoncelocation::class)
            ->where('status',1)
            ->with(['responsecomments' => function ($q){
                $q->where('status',1)->with('user','comment')->orderByDesc('created_at')
                    ->distinct()->get()
                ;},
            ])->orderByDesc('created_at')->distinct()->get());

        return response()->json($comments,200);
    }

    public function sendcomment(Request $request,annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$user,annoncelocation $annoncelocation)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $annoncelocation->comments()->create($request->all());

        CommentAndResponseService::newEmailTonewcommentannoncelocationpageShow($request,$annoncelocation);

        return response()->json($comment,200);
    }



    public function updatecomment(Request $request,annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$user,annoncelocation $annoncelocation,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($comment,200);
    }


    public function sendresponsecomment(Request $request,annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$user,annoncelocation $annoncelocation,comment $comment)
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
