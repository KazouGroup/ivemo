<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class ContactuserreservationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $userFrom;
    protected $fromPhoneUser;
    protected $fromMessageUser;
    protected $annoncereservation;

    /**
     * ContactuserreservationNotification constructor.
     * @param $userFrom
     * @param $fromPhoneUser
     * @param $fromMessageUser
     * @param $annoncereservation
     */
    public function __construct($userFrom,$fromPhoneUser,$fromMessageUser,$annoncereservation)
    {
        $this->userFrom = $userFrom;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->annoncereservation = $annoncereservation;
    }

    /**
     * @return array
     */
    public function via()
    {
        return ['database'];
    }

    /**
     * @return MailMessage
     */
    public function toMail()
    {
        return (new MailMessage)
            ->subject("Contact annonce en location sur ".config('app.name'))
            ->salutation('Cordiale')
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'userToID' => $this->annoncereservation->id,
            'userToTitle' => $this->annoncereservation->title,
            'userToSlugCity' => $this->annoncereservation->city->slug,
            'userToUserSlug' =>  $this->annoncereservation->user->slug,
            'userFromName' => $this->userFrom->first_name,
            'userFromBodyUser' => $this->fromMessageUser,
        ];
    }
}
