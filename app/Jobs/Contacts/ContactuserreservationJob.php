<?php

namespace App\Jobs\Contacts;

use App\Notifications\Contacts\ContactuserlocationNotification;
use App\Notifications\Contacts\ContactuserreservationNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ContactuserreservationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromPhoneUser;
    protected $fromMessageUser;
    protected $userFrom;
    protected $annoncereservation;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromPhoneUser,$fromMessageUser,$userFrom,$annoncereservation)
    {
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->userFrom = $userFrom;
        $this->annoncereservation = $annoncereservation;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->annoncereservation->user
            ->notify(new ContactuserreservationNotification(
                $this->fromPhoneUser,
                $this->fromMessageUser,
                $this->userFrom,
                $this->annoncereservation));
    }
}
