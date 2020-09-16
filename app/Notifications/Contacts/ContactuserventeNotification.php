<?php

namespace App\Notifications\Contacts;

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
     * ContactuserventeNotification constructor.
     * @param $fromFullnameUser
     * @param $fromPhoneUser
     * @param $fromEmailUser
     * @param $fromSubjectUser
     * @param $fromMessageUser
     * @param $annoncevente
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
            ->greeting('Salut '.$this->annoncevente->user->first_name)
            ->subject("Contact sur un bien en vente sur ".config('app.name'))
            ->salutation('Cordiale')
            ->from($this->fromEmailUser,config('app.name'))
            ->line($this->fromFullnameUser.' vous a contacter sur un de vos bien mise en vente sur la platforme - '.config('app.name'))
            ->line('ID: '.$this->annoncevente->id.' | Titre de l\'annonce: '.$this->annoncevente->title.' | Prix: '.$this->annoncevente->price.' | Ville: '.$this->annoncevente->city->name.' | Categorie: '.$this->annoncevente->categoryannoncevente->name)
            ->line($this->fromMessageUser)
            //->action('En savoir plus', url(route('personal_mails_annonceventes.site',[$this->annoncevente->user->slug])))
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'userToID' => $this->annoncevente->id,
            'userToTitle' => $this->annoncevente->title,
            'userToSlugCity' => $this->annoncevente->city->slug,
            'userToUserSlug' =>  $this->annoncevente->user->slug,
            'userToSlug' =>   $this->annoncevente->slug,
            'userFromName' => $this->fromFullnameUser,
            'userFromBodyUser' => $this->fromMessageUser,
        ];
    }
}
