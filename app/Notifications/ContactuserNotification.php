<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuserNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromEmailUser;
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $user;

    /**
     * ContactuserNotification constructor.
     * @param $fromFullnameUser
     * @param $fromEmailUser
     * @param $fromSubjectUser
     * @param $fromMessageUser
     * @param $user
     */
    public function __construct($fromFullnameUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$user)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromSubjectUser = $fromSubjectUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->user = $user;
    }

    /**
     * @return array
     */
    public function via()
    {
        return ['mail'];
    }

    /**
     * @return MailMessage
     */
    public function toMail()
    {
        return (new MailMessage)
            ->success()
            ->greeting('Salut '.$this->user->first_name)
            ->subject($this->fromSubjectUser)
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,config('app.name'))
            ->line($this->fromFullnameUser.' vous a envoyer un message')
            ->line($this->fromMessageUser)
            ->action('lire la suite', url(route('personal_mails_contacts.site',[$this->user->slug])))
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            //
        ];
    }
}
