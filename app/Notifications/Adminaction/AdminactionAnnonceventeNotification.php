<?php

namespace App\Notifications\Adminaction;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminactionAnnonceventeNotification extends Notification
{
    use Queueable;

    protected $annoncevente;

    /**
     * AdminactionAnnonceventeNotification constructor.
     * @param $annoncevente
     */
    public function __construct($annoncevente)
    {
        $this->annoncevente = $annoncevente;
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
        if ($this->annoncevente->status_admin){
            return (new MailMessage)
                ->greeting('Cher '.$this->annoncevente->user->first_name.' bonjour')
                ->subject('Activation de l\'annonce')
                ->line('Votre annonce a été réactivé et est desormais visible aux utilisateurs')
                ->line('ID: '.$this->annoncevente->id.' | Titre de l\'annonce: '.$this->annoncevente->title.' | Prix: '.$this->annoncevente->price.
                    ' | Ville: '.$this->annoncevente->city->name.' | Categorie: '.$this->annoncevente->categoryannoncevente->name.' | Posté le: '.$this->annoncevente->created_at->format('d-m-Y'))
                ->from(config('app.email'),config('app.name'))
                ->action('Visiter mon profile', url(route('annoncesventesbyuser_site',
                    [
                        $this->annoncevente->user->slug,
                    ])))
                ->salutation('Visiter le site pour en savoir plus');
        }else{
            return (new MailMessage)
                ->greeting('Cher '.$this->annoncevente->user->first_name.' bonjour')
                ->subject('Desactivation de l\'annonce')
                ->line('L\'annonce ci-dessous a été desactivé car elle respecte pas les regles de notre comunaute')
                ->line('ID: '.$this->annoncevente->id.' | Titre de l\'annonce: '.$this->annoncevente->title.' | Prix: '.$this->annoncevente->price.
                    ' | Ville: '.$this->annoncevente->city->name.' | Categorie: '.$this->annoncevente->categoryannoncevente->name.' | Posté le: '.$this->annoncevente->created_at->format('d-m-Y'))
                ->from(config('app.email'),config('app.name'))
                ->action('Visiter mon profile', url(route('annoncesventesbyuser_site',
                    [
                        $this->annoncevente->user->slug,
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
