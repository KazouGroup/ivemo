<?php
namespace App\Services\Contactusers;



use App\Jobs\Adminaction\AdminactionAnnoncelocationJob;
use App\Jobs\Contacts\ContactuserlocationJob;
use App\Jobs\Contacts\ContactuserreservationJob;
use App\Models\contactuserslocation;
use App\Services\HelpersService;
use Illuminate\Support\Facades\Auth;

class ContactusersreservationService
{


    public static function formsenddata($request,$annoncereservation)
    {
        $data = $annoncereservation->contactservices()->create([
            'to_id' => $annoncereservation->user_id,
            'phone' => $request->phone,
            'from_id' => auth()->guest() ? null : auth()->id(),
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
            'message' => $request->message,
        ]);


        return $data;
    }

    public static function newEmailToannoncereservationpageShow($request,$annoncereservation)
    {
        $fromFullnameUser = $annoncereservation->user->first_name;
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $annoncereservation->user->email;
        $fromMessageUser = $request->get('message');
        $userFrom = Auth::user();

        $emailToUser = (new ContactuserreservationJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$userFrom,$annoncereservation));

        dispatch($emailToUser);
    }

    public static function adminsendMessageToUser($annoncelocation)
    {
        $emailToUser = (new AdminactionAnnoncelocationJob($annoncelocation));

        dispatch($emailToUser);
    }
}
