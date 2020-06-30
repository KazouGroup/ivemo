<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Model\annoncereservation;
use App\Model\annoncetype;
use App\Model\categoryannoncereservation;
use App\Model\city;
use App\Model\comment;
use App\Model\responsecomment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'api','annoncereservationgetcomment',
        ]]);
    }


    public function annoncereservationgetcomment(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation)
    {
       $comments = CommentResource::collection($annoncereservation->comments()
           ->with('user','commentable','responsecomments')
           ->whereIn('commentable_id',[$annoncereservation->id])
           ->where('status',1)
           ->with(['responsecomments' => function ($q){
               $q->where('status',1)->with('user')->orderByDesc('created_at')
                   ->distinct()->get()
               ;},
           ])->orderByDesc('created_at')->distinct()->get());

       return response()->json($comments,200);
    }

    public function annoncereservationsendcomment(Request $request,annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation)
    {
        $this->validate($request,[
            'body'=>'required|max:5000',
        ]);

        $comment = $annoncereservation->comments()->create($request->all());

        return response()->json($comment,200);
    }



    public function annoncereservationupdatecomment(Request $request,annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation,comment $comment)
    {

        $this->authorize('updateComment',$comment);

        $validatedData = $request->validate(['body' => 'required|max:5000']);

        $comment->update([ 'body' => $validatedData['body'],]);

        return response()->json($comment,200);
    }

    public function annoncesreservationssendresponsecomment(Request $request,annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation,comment $comment)
    {
        $validatedData = $request->validate(['body' => 'required|min:2|max:5000']);

        $responsecomment = responsecomment::create([
            'body' => $validatedData['body'],
            'comment_id' => $comment->id,
        ]);

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
