<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\comment;
use App\Model\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class CommentblogannonceventeController extends Controller
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


    public function getcomment($categoryannoncevente, $date,blogannoncevente $blogannoncevente)
    {
        $comments = CommentResource::collection($blogannoncevente->comments()
            ->with('user','commentable','responsecomments')
            ->whereIn('commentable_id',[$blogannoncevente->id])
            ->where('status',1)
            ->with(['responsecomments' => function ($q){
                $q->where('status',1)->with('user','comment')->orderByDesc('created_at')
                    ->distinct()->get()
                ;},
            ])->orderByDesc('created_at')->distinct()->get());

        return response()->json($comments,200);
    }

    public function sendcomment(Request $request,$categoryannoncevente, $date,blogannoncevente $blogannoncevente)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $blogannoncevente->comments()->create($request->all());

        CommentAndResponseService::newEmailTonewcommentblogannonceventepageShow($request,$blogannoncevente);

        return response()->json($comment,200);
    }



    public function updatecomment(Request $request,$categoryannoncevente, $date,blogannoncevente $blogannoncevente,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($blogannoncevente,200);
    }

    public function sendresponsecomment(Request $request,$categoryannoncevente, $date,blogannoncevente $blogannoncevente,comment $comment)
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
