<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactuseremploymentToUserNotification extends Notification
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $fromMessageUser;
    protected $employment;

    /**
     * ContactuseremploymentToUserNotification constructor.
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
        return ['mail'];
    }

    /**
     * @return MailMessage
     */
    public function toMail()
    {
        return (new MailMessage)
            ->greeting('Salut '.$this->fromFullnameUser)
            ->subject("Contact emploie, prestation & service")
            ->salutation('Cordiale')
            ->from($this->employment->user->email,config('app.name'))
            ->line('Vous avez laissé un message depuis '.config('app.name').' sur cette annonce ci-dessous')
            ->line('ID: '.$this->employment->id.' | Titre de l\'annonce: '.$this->employment->title.' | Prix: '.$this->employment->price.' | Ville: '.$this->employment->city->name.' | Categorie: '.$this->employment->categoryemployment->name)
            ->action('Voir l\'annonce', url(route('employmentslug_site',
                [
                    $this->employment->categoryemployment->slug,
                    $this->employment->city->slug,
                    $this->employment->slug,
                ]
            )))
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
           //
        ];
    }
}
