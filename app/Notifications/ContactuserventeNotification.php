<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuserventeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $annoncevente;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$annoncevente)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromSubjectUser = $fromSubjectUser;
        $this->fromMessageUser = $fromMessageUser;
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
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Salut '.$this->annoncevente->user->first_name)
            ->subject($this->fromSubjectUser)
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,config('app.name'))
            ->line($this->fromFullnameUser.' vous a contacter sur un de vos bien mise en vente sur la platforme - '.config('app.name'))
            ->line('ID: '.$this->annoncevente->id.' | Titre de l\'annonce: '.$this->annoncevente->title.' | Prix: '.$this->annoncevente->price.' | Ville: '.$this->annoncevente->city->name.' | Categorie: '.$this->annoncevente->categoryannoncevente->name)
            ->line($this->fromMessageUser)
            ->action('En savoir plus', url(route('personal_mails_annonces_ventes.site',[$this->annoncevente->user->slug])))
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
