<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactadminsActivitycityNotification extends Notification
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $activitycity;
    protected $fromMessageUser;
    protected $item;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$activitycity,$fromMessageUser,$item)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->activitycity = $activitycity;
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
                    ->subject("Contacter sur ".$this->activitycity->title)
                    ->from($this->fromEmailUser,config('app.name'))
                    ->line($this->fromFullnameUser.' v '.$this->activitycity->user->first_name.' vous a laissez un message sur l\'annonce ci dessous')
                    ->line('ID: '.$this->activitycity->id.' | Titre de l\'annonce: '.$this->activitycity->title.' | Ville: '.$this->activitycity->city->name)
                    ->line($this->fromMessageUser)
                    ->salutation('Merçi de consulter le dashboard pour en savoir plus');
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
