<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewcommentNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromBodyUser;
    protected $annoncereservation;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$annoncereservation,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncereservation = $annoncereservation;
        $this->userFrom = $userFrom;
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
                    ->greeting($this->userFrom->first_name.' à poster commentaire sur cette annonce ci-dessous')
                    ->subject('Nouveau commentaire')
                    ->line('ID: '.$this->annoncereservation->id.' | Titre de l\'annonce: '.$this->annoncereservation->title.' | Prix: '.$this->annoncereservation->price.' | Ville: '.$this->annoncereservation->city->name.' | Categorie: '.$this->annoncereservation->categoryannoncereservation->name)
                    ->from($this->userFrom->email,config('app.name'))
                    ->line($this->fromBodyUser)
                    ->action('Visiter l\'annonce', url(route('annoncelocationbycategoryannoncereservationslug_site',
                        [
                            $this->annoncereservation->annoncetype->slug,
                            $this->annoncereservation->categoryannoncereservation->slug,
                            $this->annoncereservation->city->slug,
                            $this->annoncereservation->slug,
                        ])))
                    ->salutation('Visiter le site pour en savoir plus');

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
