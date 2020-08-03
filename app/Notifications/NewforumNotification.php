<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewforumNotification extends Notification
{
    use Queueable;

    protected $fromUser;
    protected $fromTitleUser;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($fromUser,$fromTitleUser)
    {
        $this->fromUser = $fromUser;
        $this->fromTitleUser = $fromTitleUser;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database'];
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
            ->subject('Nouveau post de '.$this->fromUser->first_name)
            ->greeting($this->fromTitleUser)
            ->salutation('Cordiale')
            ->from($this->fromUser->email,config('app.name'))
            //->action('En savoir plus', url(route('public_profile_forums.site',[$this->fromUser->slug])))
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
