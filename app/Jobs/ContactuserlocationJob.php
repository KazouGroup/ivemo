<?php

namespace App\Jobs;

use App\Mail\ContactuserlocationMail;
use App\Notifications\ContactuserlocationNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class ContactuserlocationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $annoncelocation;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$annoncelocation)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromSubjectUser = $fromSubjectUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->annoncelocation = $annoncelocation;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

            Notification::route('mail',   $this->annoncelocation->user->email)
                ->notify(new ContactuserlocationNotification(
                    $this->fromFullnameUser,
                    $this->fromPhoneUser,
                    $this->fromEmailUser,
                    $this->fromSubjectUser,
                    $this->fromMessageUser,
                    $this->annoncelocation));


        }catch (\Exception $e){
            Log::error($e->getMessage());
        }

    }
}
