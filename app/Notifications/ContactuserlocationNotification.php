<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuserlocationNotification extends Notification
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $annoncelocation;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$annoncelocation)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromSubjectUser = $fromSubjectUser;
        $this->fromMessageUser = $fromMessageUser;
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
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Salut '.$this->annoncelocation->user->first_name)
            ->subject($this->fromSubjectUser.' - '.config('app.name'))
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,$this->fromFullnameUser)
            ->line($this->fromFullnameUser.' vous a contacter sur un de vos bien mise en location sur la platforme - '.config('app.name'))
            ->line('ID: '.$this->annoncelocation->id.' | Titre de l\'annonce: '.$this->annoncelocation->title.' | Prix: '.$this->annoncelocation->price.' | Ville: '.$this->annoncelocation->city->name.' | Categorie: '.$this->annoncelocation->categoryannoncelocation->name)
            ->line($this->fromMessageUser)
            ->action('En savoir plus', url(route('personal_mails_annonces_locations.site',[$this->annoncelocation->user->slug])))
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
