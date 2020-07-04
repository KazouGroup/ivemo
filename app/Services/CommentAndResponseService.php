<?php
namespace App\Services;



use App\Jobs\Comments\CommentAnnoncelocationJob;
use App\Jobs\Comments\CommentAnnoncereservationJob;
use App\Jobs\Comments\CommentAnnonceventeJob;
use App\Jobs\Comments\CommentBlogannoncereservationJob;
use App\Jobs\Comments\CommentBlogannonceventeJob;
use App\Jobs\ResponsecommentJob;

class CommentAndResponseService
{

    public static function newEmailToresponsecommentpageShow($request,$comment)
    {
        $userFrom = auth()->user();
        $fromBodyUser = $request->get('body');

        // Ici je verify si status_responsecomments === 1 est active
        if ($comment->user->profile->status_responsecomments){

            $emailToUser = (new ResponsecommentJob($fromBodyUser,$comment,$userFrom));
            dispatch($emailToUser);

        }

    }

    public static function newEmailTonewcommentannoncereservationpageShow($request,$annoncereservation)
    {
        $userFrom = auth()->user();
        $fromBodyUser = $request->get('body');

        if ($annoncereservation->user->profile->status_comments){

            $emailToUser = (new CommentAnnoncereservationJob($fromBodyUser,$annoncereservation,$userFrom));

            dispatch($emailToUser);
        }

    }

    public static function newEmailTonewcommentannoncelocationpageShow($request,$annoncelocation)
    {
        $userFrom = auth()->user();
        $fromBodyUser = $request->get('body');

        if ($annoncelocation->user->profile->status_comments){

            $emailToUser = (new CommentAnnoncelocationJob($fromBodyUser,$annoncelocation,$userFrom));

            dispatch($emailToUser);
        }

    }

    public static function newEmailTonewcommentannonceventepageShow($request,$annoncevente)
    {
        $userFrom = auth()->user();
        $fromBodyUser = $request->get('body');

        if ($annoncevente->user->profile->status_comments){

            $emailToUser = (new CommentAnnonceventeJob($fromBodyUser,$annoncevente,$userFrom));

            dispatch($emailToUser);
        }

    }

    public static function newEmailTonewcommentblogannoncereservationpageShow($request,$blogannoncereservation)
    {
        $userFrom = auth()->user();
        $fromBodyUser = $request->get('body');

        if ($blogannoncereservation->user->profile->status_comments){

            $emailToUser = (new CommentBlogannoncereservationJob($fromBodyUser,$blogannoncereservation,$userFrom));

            dispatch($emailToUser);
        }

    }

    public static function newEmailTonewcommentblogannonceventepageShow($request,$blogannoncevente)
    {
        $userFrom = auth()->user();
        $fromBodyUser = $request->get('body');

        if ($blogannoncevente->user->profile->status_comments){

            $emailToUser = (new CommentBlogannonceventeJob($fromBodyUser,$blogannoncevente,$userFrom));

            dispatch($emailToUser);
        }

    }

}
