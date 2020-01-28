<?php


namespace App\Services\Admin;


use App\Jobs\MailTaskEmailJob;
use App\Model\admin\note;
use App\Model\user\User;
use Illuminate\Support\Facades\Auth;

class MailTaskService
{
    /**
     * Return the permission with the given id, or null if no product is found.
     *
     * @param int $id
     */
    public static function newTask($request)
    {
        $notes = note::with('user')->latest()->get();
        $users = User::latest()->get();

        foreach ($users as $item) {
            if ($item->id != $request->administrator_id ){
               //
            }else{
                $to[] = $item->email;
            }

        }

        foreach ($notes as $item){
            if ($item->id != $request->note_id ){
                //
            }else{
                $subject = $item->title;
                $message = $item->body;
            }
        }

        $from = ['address' => Auth::user()->email, 'name' => Auth::user()->name];
        $emailuserJob = (new MailTaskEmailJob($subject,$message,$to,$from));
        dispatch($emailuserJob);
    }

}
