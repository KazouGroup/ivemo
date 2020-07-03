<?php

namespace App\Notifications\Adminaction;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminactionAnnoncelocationNotification extends Notification
{
    use Queueable;

    protected $annoncelocation;

    /**
     * AdminactionAnnoncelocationNotification constructor.
     * @param $annoncelocation
     */
    public function __construct($annoncelocation)
    {
        $this->annoncelocation = $annoncelocation;
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
        if ($this->annoncelocation->status_admin){
            return (new MailMessage)
                ->greeting('Cher '.$this->annoncelocation->user->first_name.' bonjour')
                ->subject('Activation de l\'annonce')
                ->line('Votre annonce a été réactivé et est desormais visible aux utilisateurs')
                ->line('ID: '.$this->annoncelocation->id.' | Titre de l\'annonce: '.$this->annoncelocation->title.' | Prix: '.$this->annoncelocation->price.
                    ' | Ville: '.$this->annoncelocation->city->name.' | Categorie: '.$this->annoncelocation->categoryannoncelocation->name.' | Posté le: '.$this->annoncelocation->created_at->format('d-m-Y'))
                ->from(config('app.email'),config('app.name'))
                ->action('Visiter mon profile', url(route('annonceslocationsbyuser_site',
                    [
                        $this->annoncelocation->user->slug,
                    ])))
                ->salutation('Visiter le site pour en savoir plus');
        }else{
            return (new MailMessage)
                ->greeting('Cher '.$this->annoncelocation->user->first_name.' bonjour')
                ->subject('Desactivation de l\'annonce')
                ->line('L\'annonce ci-dessous a été desactivé car elle respecte pas les regles de notre comunaute')
                ->line('ID: '.$this->annoncelocation->id.' | Titre de l\'annonce: '.$this->annoncelocation->title.' | Prix: '.$this->annoncelocation->price.
                    ' | Ville: '.$this->annoncelocation->city->name.' | Categorie: '.$this->annoncelocation->categoryannoncelocation->name.' | Posté le: '.$this->annoncelocation->created_at->format('d-m-Y'))
                ->from(config('app.email'),config('app.name'))
                ->action('Visiter mon profile', url(route('annonceslocationsbyuser_site',
                    [
                        $this->annoncelocation->user->slug,
                    ])))
                ->salutation('Visiter le site pour en savoir plus');
        }
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
