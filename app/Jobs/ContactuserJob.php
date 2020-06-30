<?php

namespace App\Jobs;

use App\Notifications\ContactuserNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class ContactuserJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromFullnameUser;
    protected $fromEmailUser;
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$user)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromSubjectUser = $fromSubjectUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

            Notification::route('mail',   $this->user->email)
                ->notify(new ContactuserNotification(
                    $this->fromFullnameUser,
                    $this->fromEmailUser,
                    $this->fromSubjectUser,
                    $this->fromMessageUser,
                    $this->user));

        }catch (\Exception $e){
            Log::error($e->getMessage());
        }

    }
}
