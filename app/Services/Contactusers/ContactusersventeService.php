<?php
namespace App\Services\Contactusers;



use App\Jobs\Adminaction\AdminactionAnnonceventeJob;
use App\Jobs\Contacts\ContactuserventeJob;
use App\Models\contactusersvente;
use App\Services\HelpersService;

class ContactusersventeService
{

    public static function newEmailToannoncelocationpageShow($request,$annoncevente)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $request->get('email');
        $fromSubjectUser = $request->get('subject');
        $fromMessageUser = $request->get('message');


        $emailToUser = (new ContactuserventeJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$annoncevente));

        dispatch($emailToUser);
    }

    public static function adminsendMessageToUser($annoncevente)
    {

        $emailToUser = (new AdminactionAnnonceventeJob($annoncevente));

        dispatch($emailToUser);
    }
}
