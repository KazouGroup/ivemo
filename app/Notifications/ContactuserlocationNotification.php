<?php

namespace App\Notifications;

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
    protected $fromSubjectUser;
    protected $fromMessageUser;
    protected $annoncelocation;

    /**
     * ContactuserlocationNotification constructor.
     * @param $fromFullnameUser
     * @param $fromPhoneUser
     * @param $fromEmailUser
     * @param $fromSubjectUser
     * @param $fromMessageUser
     * @param $annoncelocation
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
            ->subject($this->fromSubjectUser)
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,config('app.name'))
            ->line($this->fromFullnameUser.' vous a contacter sur un de vos bien mise en location sur la platforme - '.config('app.name'))
            ->line('ID: '.$this->annoncelocation->id.' | Titre de l\'annonce: '.$this->annoncelocation->title.' | Prix: '.$this->annoncelocation->price.' | Ville: '.$this->annoncelocation->city->name.' | Categorie: '.$this->annoncelocation->categoryannoncelocation->name)
            ->line($this->fromMessageUser)
            ->action('En savoir plus', url(route('personal_mails_annonces_locations.site',[$this->annoncelocation->user->slug])))
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'annoncelocationID' => $this->annoncelocation->id,
            'annoncelocationTitle' => $this->annoncelocation->title,
            'fromMessage' => $this->fromMessageUser,
            'fromFullnameUser' => $this->fromFullnameUser,
        ];
    }
}
