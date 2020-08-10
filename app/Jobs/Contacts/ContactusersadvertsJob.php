<?php

namespace App\Jobs\Contacts;

use App\Notifications\Contacts\ContactusersadvertsNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ContactusersadvertsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromMessageUser;
    protected $toAdminUser;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$toAdminUser)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->toAdminUser = $toAdminUser;

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
                $roleGet = $item->user->roles->pluck('name');

                if ($roleGet[0] === 'super-admin' ||
                    $roleGet[0] === 'admin' ||
                    $roleGet[0] === 'advertiser'
                )

                    $toEmailAdminUser = $item->user;

                $toEmailAdminUser->notify(new ContactusersadvertsNotification(
                    $this->fromFullnameUser,
                    $this->fromPhoneUser,
                    $this->fromEmailUser,
                    $this->fromMessageUser,
                    $item
                ));continue;
            }



        }catch (\Exception $e){
            Log::error($e->getMessage());
        }

    }
}
