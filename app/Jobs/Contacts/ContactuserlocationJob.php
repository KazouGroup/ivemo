<?php

namespace App\Jobs\Contacts;

use App\Notifications\Contacts\ContactuserlocationNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ContactuserlocationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromMessageUser;
    protected $annoncelocation;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$annoncelocation)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
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
        $this->annoncelocation->user
            ->notify(new ContactuserlocationNotification(
                $this->fromFullnameUser,
                $this->fromPhoneUser,
                $this->fromEmailUser,
                $this->fromMessageUser,
                $this->annoncelocation));
    }
}
