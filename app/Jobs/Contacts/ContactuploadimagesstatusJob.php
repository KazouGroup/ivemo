<?php

namespace App\Jobs\Contacts;

use App\Notifications\Contacts\ContactuploadimagesstatusNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ContactuploadimagesstatusJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $uploadimage;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($uploadimage)
    {
        $this->uploadimage = $uploadimage;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->uploadimage->uploadimagealable->user
            ->notify(new ContactuploadimagesstatusNotification(
                $this->uploadimage));
    }
}
