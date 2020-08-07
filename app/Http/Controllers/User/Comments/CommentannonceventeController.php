<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Model\annoncetype;
use App\Model\annoncevente;
use App\Model\categoryannoncevente;
use App\Model\city;
use App\Model\comment;
use App\Model\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class CommentannonceventeController extends Controller
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


    public function getcomment(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$user,annoncevente $annoncevente)
    {
        $comments = CommentResource::collection($annoncevente->comments()
            ->with('user','commentable','responsecomments')
            ->whereIn('commentable_id',[$annoncevente->id])
            ->where('status',1)
            ->with(['responsecomments' => function ($q){
                $q->where('status',1)->with('user','comment')->orderByDesc('created_at')
                    ->distinct()->get()
                ;},
            ])->orderByDesc('created_at')->distinct()->get());

        return response()->json($comments,200);
    }

    public function sendcomment(Request $request,annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$user,annoncevente $annoncevente)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $annoncevente->comments()->create($request->all());

        //broadcast(new CommentAnnonceventEvent($comment))->toOthers();

        CommentAndResponseService::newEmailTonewcommentannonceventepageShow($request,$annoncevente);

        return response()->json($comment,200);
    }



    public function updatecomment(Request $request,annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$user,annoncevente $annoncevente,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($comment,200);
    }


    public function sendresponsecomment(Request $request,annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$user,annoncevente $annoncevente,comment $comment)
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
