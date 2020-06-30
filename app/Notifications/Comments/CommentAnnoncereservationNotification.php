<?php

namespace App\Notifications\Comments;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentAnnoncereservationNotification extends Notification implements ShouldQueue
{
    use Queueable;


    protected $fromBodyUser;
    protected $annoncereservation;
    protected $userFrom;

    /**
     * NewcommentNotification constructor.
     * @param $fromBodyUser
     * @param $annoncereservation
     * @param $userFrom
     */
    public function __construct($fromBodyUser,$annoncereservation,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncereservation = $annoncereservation;
        $this->userFrom = $userFrom;
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
            ->greeting($this->userFrom->first_name.' à poster commentaire sur cette annonce ci-dessous')
            ->subject('Nouveau commentaire')
            ->line('ID: '.$this->annoncereservation->id.' | Titre de l\'annonce: '.$this->annoncereservation->title.' | Prix: '.$this->annoncereservation->price.' | Ville: '.$this->annoncereservation->city->name.' | Categorie: '.$this->annoncereservation->categoryannoncereservation->name)
            ->from($this->userFrom->email,config('app.name'))
            ->line($this->fromBodyUser)
            ->action('Visiter l\'annonce', url(route('annoncelocationbycategoryannoncereservationslug_site',
                [
                    $this->annoncereservation->annoncetype->slug,
                    $this->annoncereservation->categoryannoncereservation->slug,
                    $this->annoncereservation->city->slug,
                    $this->annoncereservation->slug,
                ])))
            ->salutation('Visiter le site pour en savoir plus');

    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'annoncereservationID' => $this->annoncereservation->id,
            'annoncereservationTitle' => $this->annoncereservation->title,
            'userFromName' => $this->userFrom->first_name
        ];
    }
}
