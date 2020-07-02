<?php

namespace App\Notifications\Comments;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentAnnonceventeNotification extends Notification implements ShouldQueue
{
    use Queueable;


    protected $fromBodyUser;
    protected $annoncevente;
    protected $userFrom;

    /**
     * CommentAnnonceventeNotification constructor.
     * @param $fromBodyUser
     * @param $annoncevente
     * @param $userFrom
     */
    public function __construct($fromBodyUser,$annoncevente,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncevente = $annoncevente;
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
            ->line('ID: '.$this->annoncevente->id.' | Titre de l\'annonce: '.$this->annoncevente->title.' | Prix: '.$this->annoncevente->price.' | Ville: '.$this->annoncevente->city->name.' | Categorie: '.$this->annoncevente->categoryannoncevente->name)
            ->from($this->userFrom->email,config('app.name'))
            ->line($this->fromBodyUser)
            ->action('Visiter l\'annonce', url(route('annonceventebycategoryannonceventeslug_site',
                [
                    $this->annoncevente->annoncetype->slug,
                    $this->annoncevente->categoryannoncevente->slug,
                    $this->annoncevente->city->slug,
                    $this->annoncevente->slug,
                ])))
            ->salutation('Visiter le site pour en savoir plus');

    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'annonceventeID' => $this->annoncevente->id,
            'annonceventeTitle' => $this->annoncevente->title,
            'userFromName' => $this->userFrom->first_name
        ];
    }
}
