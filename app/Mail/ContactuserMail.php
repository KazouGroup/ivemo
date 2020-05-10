<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactuserMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $emailFullname;
    protected $emailSubject;
    protected $emailMessage;
    protected $emailTo;
    protected $emailFrom;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($full_name,$subject,$message,$to,$from)
    {
        $this->emailFullname = $full_name;
        $this->emailSubject = $subject;
        $this->emailMessage = $message;
        $this->emailTo = $to;
        $this->emailFrom = $from;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->to($this->emailTo)->from($this->emailFrom)
            ->subject($this->emailSubject)->view('emails.mail_personal');
    }
}
