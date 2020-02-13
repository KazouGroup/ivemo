<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmreservationMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $emailTo;
    protected $emailFrom;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($to,$from)
    {
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
            ->subject("confirmation reservation")->view('emails.confirmation_reservation');
    }
}
