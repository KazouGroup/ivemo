<?php

namespace App\Jobs;

use App\Mail\ContactuserlocationMail;
use App\Mail\ContactworkwithusMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactworkwithusJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $emailFrom;
    protected $emailTo;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($to=[],$from=[])
    {
        $this->emailFrom = $from !== null? Arr::wrap($from) : [];
        $this->emailTo = $to !== null? Arr::wrap($to) : [];


    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

            $emailData = new ContactworkwithusMail($this->emailTo,$this->emailFrom);
            Mail::send($emailData);

        }catch (\Exception $e){
            Log::error($e->getMessage());
        }

    }
}
