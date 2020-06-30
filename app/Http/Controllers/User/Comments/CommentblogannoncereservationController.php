<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Model\blogannoncereservation;
use App\Model\comment;
use App\Model\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class CommentblogannoncereservationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'api','getcomment',
        ]]);
    }


    public function getcomment($categoryannoncereservation, $date,blogannoncereservation $blogannoncereservation)
    {
        $comments = CommentResource::collection($blogannoncereservation->comments()
            ->with('user','commentable','responsecomments')
            ->whereIn('commentable_id',[$blogannoncereservation->id])
            ->where('status',1)
            ->with(['responsecomments' => function ($q){
                $q->where('status',1)->with('user')->orderByDesc('created_at')
                    ->distinct()->get()
                ;},
            ])->orderByDesc('created_at')->distinct()->get());

        return response()->json($comments,200);
    }

    public function sendcomment(Request $request,$categoryannoncereservation, $date,blogannoncereservation $blogannoncereservation)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $blogannoncereservation->comments()->create($request->all());

        CommentAndResponseService::newEmailTonewcommentblogannoncereservationpageShow($request,$blogannoncereservation);

        return response()->json($comment,200);
    }



    public function updatecomment(Request $request,$categoryannoncereservation, $date,blogannoncereservation $blogannoncereservation,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($blogannoncereservation,200);
    }

    public function sendresponsecomment(Request $request,$categoryannoncereservation, $date,blogannoncereservation $blogannoncereservation,comment $comment)
    {
        $validatedData = $request->validate(['body' => 'required|min:2|max:5000']);

        $responsecomment = responsecomment::create([
            'body' => $validatedData['body'],
            'comment_id' => $comment->id,
        ]);

        CommentAndResponseService::newEmailToresponsecommentpageShow($request,$comment);

        return $responsecomment->toJson();
    }

    public function responses_update(Request $request,responsecomment $responsecomment)
    {
        $validatedData = $request->validate(['body' => 'required|min:2|max:5000']);

        $responsecomment->update([
            'body' => $validatedData['body'],
        ]);

        return $responsecomment->toJson();
    }

    public function responses_unactive(Request $request,responsecomment $responsecomment)
    {

        $responsecomment->update(['status' => 0,]);

        return response()->json($responsecomment,200);
    }

    public function unactive(Request $request,comment $comment)
    {
        $this->authorize('updateStatusAutor',$comment);

        $comment->update(['status' => 0,]);

        return response()->json($comment,200);
    }

    public function destroy(comment $comment)
    {
        $this->authorize('updateComment',$comment);

        $comment->delete();

        return ['message' => 'Deleted successfully '];
    }

    public function destroyresponse(responsecomment $responsecomment)
    {
        $responsecomment->delete();

        return ['message' => 'Deleted successfully '];
    }
}
