<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuploadimagesstatusNotification extends Notification
{
    use Queueable;

    protected $uploadimage;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($uploadimage)
    {
        $this->uploadimage = $uploadimage;
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
        if ($this->uploadimage->uploadimagealable->annoncetype->id === 1){
            return (new MailMessage)
                ->greeting('Salut '.$this->uploadimage->uploadimagealable->user->first_name)
                ->subject("Changement du status de l'image")
                ->line("Status de l'image changé sur le bien ci-dessous")
                ->line('ID: '.$this->uploadimage->uploadimagealable->id.' | Type: '.$this->uploadimage->uploadimagealable->annoncetype->name.' | Titre de l\'annonce: '.$this->uploadimage->uploadimagealable->title.' | Prix: '.$this->uploadimage->uploadimagealable->price.' | Ville: '.$this->uploadimage->uploadimagealable->city->name.' | Categorie: '.$this->uploadimage->uploadimagealable->categoryannoncelocation->name)
                ->action('Voir l\'annonce', url(route('annoncelocationsedit_site',
                    [
                        $this->uploadimage->uploadimagealable->annoncetype->slug,
                        $this->uploadimage->uploadimagealable->slugin,
                    ]
                )))
                ->salutation('Ajouter une image au format 1200x703');
        }elseif ($this->uploadimage->uploadimagealable->annoncetype->id === 2){

            return (new MailMessage)
                ->greeting('Salut '.$this->uploadimage->uploadimagealable->user->first_name)
                ->subject("Changement du status de l'image")
                ->line("Status de l'image changé sur le bien ci-dessous")
                ->line('ID: '.$this->uploadimage->uploadimagealable->id.' | Type: '.$this->uploadimage->uploadimagealable->annoncetype->name.' | Titre de l\'annonce: '.$this->uploadimage->uploadimagealable->title.' | Prix: '.$this->uploadimage->uploadimagealable->price.' | Ville: '.$this->uploadimage->uploadimagealable->city->name.' | Categorie: '.$this->uploadimage->uploadimagealable->categoryannoncevente->name)
                ->action('Voir l\'annonce', url(route('annonceventesedit_site',
                    [
                        $this->uploadimage->uploadimagealable->annoncetype->slug,
                        $this->uploadimage->uploadimagealable->slugin,
                    ]
                )))
                ->salutation('Ajouter une image au format 1200x703');
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
