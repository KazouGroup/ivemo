<?php

namespace App\Jobs;

use App\Mail\ConfirmreservationMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ConfirmreservationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $emailTo;
    protected $fromEmail;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($to=[],$from=[])
    {
        $this->emailTo = $to !== null? Arr::wrap($to) : [];
        $this->fromEmail = $from !== null? Arr::wrap($from) : [];
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

            foreach ($this->emailTo as $email){

                $emailData = new ConfirmreservationMail(
                    $email,
                    $this->fromEmail
                );
                Mail::send($emailData);
            }

        }catch (\Exception $e){
            Log::error($e->getMessage());
        }
    }
}
