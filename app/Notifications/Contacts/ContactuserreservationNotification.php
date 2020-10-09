<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuserreservationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromMessageUser;
    protected $annoncereservation;

    /**
     * ContactuserlocationNotification constructor.
     * @param $fromFullnameUser
     * @param $fromPhoneUser
     * @param $fromEmailUser
     * @param $fromMessageUser
     * @param $annoncereservation
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$annoncereservation)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->annoncereservation = $annoncereservation;
    }

    /**
     * @return array
     */
    public function via()
    {
        return ['mail','database'];
    }

    /**
     * @return MailMessage
     */
    public function toMail()
    {
        return (new MailMessage)
            ->greeting('Salut '.$this->annoncereservation->user->first_name)
            ->subject("Contact annonce en location sur ".config('app.name'))
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,config('app.name'))
            ->line($this->fromFullnameUser.' vous a contacté sur ce bien ci-dessous en location - '.config('app.name'))
            ->line('ID: '.$this->annoncereservation->id.' | Type: '.$this->annoncereservation->annoncetype->name.' | Titre de l\'annonce: '.$this->annoncereservation->title.' | Prix: '.$this->annoncereservation->price.' | Ville: '.$this->annoncereservation->city->name.' | Categorie: '.$this->annoncereservation->categoryannoncereservation->name)
            ->line($this->fromMessageUser)
           // ->action('En savoir plus', url(route('contactservice_annoncelocationsbyuserbystatistique_site',[$this->annoncereservation->user->slug,$this->annoncereservation->annoncetype->slug,$this->annoncereservation->slugin])))
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'userToID' => $this->annoncereservation->id,
            'userToTitle' => $this->annoncereservation->title,
            'userToSlugCity' => $this->annoncereservation->city->slug,
            'userToUserSlug' =>  $this->annoncereservation->user->slug,
            'userToSlug' =>   $this->annoncereservation->slug,
            'userFromName' => $this->fromFullnameUser,
            'userFromBodyUser' => $this->fromMessageUser,
        ];
    }
}
