<?php

namespace App\Jobs\Contacts;

use App\Notifications\Contacts\ContactuseremploymentNotification;
use App\Notifications\Contacts\ContactuseremploymentToUserNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class ContactuseremploymentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromMessageUser;
    protected $employment;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$employment)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->employment = $employment;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        /* Ici on envoie l'email a l'utilisateur qui a poster l'annonce */

        $this->employment->user
            ->notify(new ContactuseremploymentNotification(
                $this->fromFullnameUser,
                $this->fromPhoneUser,
                $this->fromEmailUser,
                $this->fromMessageUser,
                $this->employment));

        /* Ici on envoie l'email a l'utilisateur que a envoyer la demande */

        Notification::route('mail',$this->fromEmailUser)
            ->notify(new ContactuseremploymentToUserNotification(
                $this->fromFullnameUser,
                $this->fromPhoneUser,
                $this->fromEmailUser,
                $this->fromMessageUser,
                $this->employment));
    }
}
