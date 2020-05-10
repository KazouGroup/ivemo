<?php

namespace App\Jobs;

use App\Mail\ContactuserMail;
use App\Mail\ContactuserventeMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactuserventeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $full_name;
    protected $phone;
    protected $email;
    protected $subject;
    protected $message;
    protected $emailTo;
    protected $emailFrom;
    protected $cc;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($full_name,$phone,$email,$subject,$message,$to=[],$from=[])
    {
        $this->full_name = $full_name;
        $this->phone = $phone;
        $this->emailuserFrom = $email;
        $this->subject = $subject;
        $this->message = $message;
        $this->emailTo = $to !== null? Arr::wrap($to) : [];
        $this->emailFrom = $from !== null? Arr::wrap($from) : [];


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

                $emailData = new ContactuserventeMail(
                    $this->full_name,
                    $this->subject,
                    $this->message,
                    $email,
                    $this->emailFrom
                );
                Mail::send($emailData);
            }


        }catch (\Exception $e){
            Log::error($e->getMessage());
        }

    }
}
