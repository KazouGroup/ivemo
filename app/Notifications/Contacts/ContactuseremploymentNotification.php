<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuseremploymentNotification extends Notification
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromMessageUser;
    protected $employment;

    /**
     * ContactuseremploymentNotification constructor.
     * @param $fromFullnameUser
     * @param $fromPhoneUser
     * @param $fromEmailUser
     * @param $fromMessageUser
     * @param $employment
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$employment)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->employment = $employment;
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
            ->greeting('Salut '.$this->employment->user->first_name)
            ->subject("Contact emplois, prestations & services")
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,config('app.name'))
            ->line($this->fromFullnameUser.' vous a contacté sur cette annonce ci-dessous posté sur la plateforme - '.config('app.name'))
            ->line('ID: '.$this->employment->id.' | Titre de l\'annonce: '.$this->employment->title.' | Prix: '.$this->employment->price.' | Ville: '.$this->employment->city->name.' | Categorie: '.$this->employment->categoryemployment->name)
            ->line($this->fromMessageUser)
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'employmentID' => $this->employment->id,
            'employmentTitle' => $this->employment->title,
            'fromMessage' => $this->fromMessageUser,
            'fromFullnameUser' => $this->fromFullnameUser,
        ];
    }
}
