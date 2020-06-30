<?php
namespace App\Services;



use App\Http\Resources\AnnoncereservationResource;
use App\Jobs\NewcommentJob;
use App\Jobs\ResponsecommentJob;
use App\Model\categoryannoncereservation;
use App\Model\city;
use Illuminate\Support\Facades\Cache;

class CommentAndResponseService
{

    public static function newEmailToresponsecommentpageShow($request,$annoncereservation,$comment)
    {
        $userFrom = auth()->user();
        $fromBodyUser = $request->get('body');

        $emailToUser = (new ResponsecommentJob($fromBodyUser,$annoncereservation,$comment,$userFrom));

        dispatch($emailToUser);

    }

    public static function newEmailTonewcommentpageShow($request,$annoncereservation)
    {
        $userFrom = auth()->user();
        $fromBodyUser = $request->get('body');

        $emailToUser = (new NewcommentJob($fromBodyUser,$annoncereservation,$userFrom));

        dispatch($emailToUser);

    }

}
