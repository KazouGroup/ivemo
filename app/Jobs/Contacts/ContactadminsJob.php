<?php

namespace App\Jobs\Contacts;

use Illuminate\Bus\Queueable;
use App\Notifications\Contacts\ContactadminsNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ContactadminsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromFirstnameUser;
    protected $fromLastnameUser;
    protected $fromEmailUser;
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $toAdminUser;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromFirstnameUser,$fromLastnameUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$toAdminUser)
    {
        $this->fromFirstnameUser = $fromFirstnameUser;
        $this->fromLastnameUser = $fromLastnameUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromSubjectUser = $fromSubjectUser;
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
                $roleGet = $item->roles->pluck('name');

                if ($roleGet[0] === 'super-admin' ||
                    $roleGet[0] === 'admin' ||
                    $roleGet[0] === 'advertiser'
                )

                    $toEmailAdminUser = $item;

                $toEmailAdminUser->notify(new ContactadminsNotification(
                    $this->fromFirstnameUser,
                    $this->fromLastnameUser,
                    $this->fromEmailUser,
                    $this->fromSubjectUser,
                    $this->fromMessageUser,
                    $item
                ));continue;
            }



        }catch (\Exception $e){
            Log::error($e->getMessage());
        }
    } 
}
