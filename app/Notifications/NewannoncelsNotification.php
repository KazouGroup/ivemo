<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewannoncelsNotification extends Notification
{
    use Queueable;

    protected $fromUser;
    protected $annoncetype;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($fromUser,$annoncetype)
    {
        $this->fromUser = $fromUser;
        $this->annoncetype = $annoncetype;
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
            ->greeting('Salut')
            ->subject('Nouvelle annonce de '.$this->fromUser->first_name)
            ->salutation('Cordiale')
            ->from($this->fromUser->email,config('app.name'))
            ->line($this->fromUser->first_name.' à poster une annonce sur les '.$this->annoncetype->slug.'.')
            ->action('En savoir plus', url(route('public_profile_als.site',[$this->fromUser->slug,$this->annoncetype->slug])))
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
