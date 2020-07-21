<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactadminsNotification extends Notification
{
    use Queueable;

    protected $fromFirstnameUser;
    protected $fromLastnameUser;
    protected $fromEmailUser;
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $item;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($fromFirstnameUser,$fromLastnameUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$item)
    {
        $this->fromFirstnameUser = $fromFirstnameUser;
        $this->fromLastnameUser = $fromLastnameUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromSubjectUser = $fromSubjectUser;
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
                    ->greeting('Salut '.$this->item->first_name)
                    ->subject($this->fromSubjectUser)
                    ->from($this->fromEmailUser,config('app.name'))
                    ->line($this->fromFirstnameUser.' '.$this->fromLastnameUser.' vous a laissez un message - '.config('app.name'))
                    ->line($this->fromMessageUser)
                    //->action('En savoir plus', url(route('personal_mails_annonces_ventes.site',[$this->user->slug])))
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
