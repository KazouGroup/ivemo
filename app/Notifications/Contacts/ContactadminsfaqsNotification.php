<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactadminsfaqsNotification extends Notification
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromEmailUser;
    protected $fromMessageUser;
    protected $item;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromEmailUser,$fromMessageUser,$item)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->item = $item;
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
     * @return MailMessage
     */
    public function toMail()
    {
        return (new MailMessage)
                    ->greeting('Salut '.$this->item->user->first_name)
                    ->subject('Contact de FAQs')
                    ->from($this->fromEmailUser,config('app.name'))
                    ->line($this->fromFullnameUser.' vous a envoyé un message de la page FAQs - '.config('app.name'))
                    ->line($this->fromMessageUser)
                    ->salutation('Merçi');
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
