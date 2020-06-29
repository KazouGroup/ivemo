<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Arr;

class NewemployementNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromUser;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromUser)
    {
        $this->fromUser = $fromUser;
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
                    ->greeting('Salut')
                    ->subject('Nouvelle annonce de '.$this->fromUser->first_name)
                    ->salutation('Cordiale')
                    ->from($this->fromUser->email)
                    ->line($this->fromUser->first_name.' à poster une annonce sur les emploies service et prestation.')
                    ->action('En savoir plus', url(route('public_profile_employments.site',[$this->fromUser->slug])))
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
