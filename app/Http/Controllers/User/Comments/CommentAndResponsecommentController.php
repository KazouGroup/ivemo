<?php

namespace App\Http\Controllers\User\Comments;

use App\Http\Controllers\Controller;
use App\Model\comment;
use App\Model\responsecomment;
use Illuminate\Http\Request;

class CommentAndResponsecommentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
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
