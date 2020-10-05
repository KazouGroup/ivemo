<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\annoncereservation;
use App\Models\annoncetype;
use App\Models\categoryannoncereservation;
use App\Models\city;
use App\Models\comment;
use App\Models\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class CommentannoncereservationController extends Controller
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


    public function getcomment(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation)
    {
        $comments = CommentResource::collection($annoncereservation->comments()
            ->with('user','commentable','responsecomments')
            ->whereIn('commentable_id',[$annoncereservation->id])
            ->where('commentable_type',annoncereservation::class)
            ->where('status',1)
            ->with(['responsecomments' => function ($q){
                $q->where('status',1)->with('user','comment')->orderByDesc('created_at')
                    ->distinct()->get()
                ;},
            ])->orderByDesc('created_at')->distinct()->get());

        return response()->json($comments,200);
    }

    public function sendcomment(Request $request,annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $annoncereservation->comments()->create($request->all());

        CommentAndResponseService::newEmailTonewcommentannoncereservationpageShow($request,$annoncereservation);

        return response()->json($comment,200);
    }



    public function updatecomment(Request $request,annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($comment,200);
    }


    public function sendresponsecomment(Request $request,annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation,comment $comment)
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
