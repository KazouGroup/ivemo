<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuserlocationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromMessageUser;
    protected $annoncelocation;

    /**
     * ContactuserlocationNotification constructor.
     * @param $fromFullnameUser
     * @param $fromPhoneUser
     * @param $fromEmailUser
     * @param $fromMessageUser
     * @param $annoncelocation
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$annoncelocation)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->annoncelocation = $annoncelocation;
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
            ->greeting('Salut '.$this->annoncelocation->user->first_name)
            ->subject("Contact annonce en location sur ".config('app.name'))
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,config('app.name'))
            ->line($this->fromFullnameUser.' vous a contacté sur ce bien ci-dessous en location - '.config('app.name'))
            ->line('ID: '.$this->annoncelocation->id.' | Type: '.$this->annoncelocation->annoncetype->name.' | Titre de l\'annonce: '.$this->annoncelocation->title.' | Prix: '.$this->annoncelocation->price.' | Ville: '.$this->annoncelocation->city->name.' | Categorie: '.$this->annoncelocation->categoryannoncelocation->name)
            ->line($this->fromMessageUser)
            ->action('En savoir plus', url(route('contactservice_annoncelocationsbyuserbystatistique_site',[$this->annoncelocation->user->slug,$this->annoncelocation->annoncetype->slug,$this->annoncelocation->slugin])))
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'userToID' => $this->annoncelocation->id,
            'userToTitle' => $this->annoncelocation->title,
            'userToSlugCity' => $this->annoncelocation->city->slug,
            'userToUserSlug' =>  $this->annoncelocation->user->slug,
            'userToSlug' =>   $this->annoncelocation->slug,
            'userFromName' => $this->fromFullnameUser,
            'userFromBodyUser' => $this->fromMessageUser,
        ];
    }
}
