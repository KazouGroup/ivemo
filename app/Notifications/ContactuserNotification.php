<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuserNotification extends Notification
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromEmailUser;
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $user;
    /**
     * Create a new message instance.
     *
     * @return void
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
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->success()
            ->greeting('Salut '.$this->user->first_name)
            ->subject($this->fromSubjectUser)
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,$this->fromFullnameUser)
            ->line($this->fromFullnameUser.' vous a envoyer un message')
            ->line($this->fromMessageUser)
            ->action('lire la suite', url(route('personal_mails_contacts.site',[$this->user->slug])))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
