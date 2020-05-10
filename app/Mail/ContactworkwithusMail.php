<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactworkwithusMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $emailFrom;
    protected $emailTo;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($to,$from)
    {
        $this->emailFrom = $from;
        $this->emailTo = $to;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->to($this->emailTo)->from($this->emailFrom)
            ->subject(config('app.name')." - ".config('app.country')." Job")
            ->view('emails.mail_work_with_us');
    }
}
