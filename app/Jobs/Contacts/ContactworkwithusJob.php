<?php

namespace App\Jobs\Contacts;

use App\Notifications\Contacts\ContactworkwithusNotification;
use App\Notifications\Contacts\ContactworkwithusToUserNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class ContactworkwithusJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $toAdminUser;
    protected $workwithus;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$toAdminUser,$workwithus)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->toAdminUser = $toAdminUser;
        $this->workwithus = $workwithus;


    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

            /* Ici on envoie l'email aux admin qui a poster l'annonce */

            foreach ($this->toAdminUser as $item){
                $roleGet = $item->roles->pluck('name');

                if ($roleGet[0] === 'super-admin' ||
                    $roleGet[0] === 'admin' ||
                    $roleGet[0] === 'advertiser'
                )
                    $toAdminUser = $item;

                $toAdminUser->notify(new ContactworkwithusNotification(
                        $this->fromFullnameUser,
                        $this->fromPhoneUser,
                        $this->fromEmailUser,
                        $this->workwithus,
                        $item
                ));continue;
            }


            /* Ici on envoie l'email a l'utilisateur que a envoyer la demande */

            Notification::route('mail',$this->fromEmailUser)
                ->notify(new ContactworkwithusToUserNotification(
                    $this->fromFullnameUser,
                    $this->fromPhoneUser,
                    $this->fromEmailUser,
                    $this->workwithus
                ));




        }catch (\Exception $e){
            Log::error($e->getMessage());
        }

    }
}
