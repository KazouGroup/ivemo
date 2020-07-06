<?php

namespace App\Notifications\Comments;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentAnnoncelocationNotification extends Notification implements ShouldQueue
{
    use Queueable;


    protected $fromBodyUser;
    protected $annoncelocation;
    protected $userFrom;

    /**
     * CommentAnnoncelocationNotification constructor.
     * @param $fromBodyUser
     * @param $annoncelocation
     * @param $userFrom
     */
    public function __construct($fromBodyUser,$annoncelocation,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncelocation = $annoncelocation;
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
            ->line('ID: '.$this->annoncelocation->id.' | Titre de l\'annonce: '.$this->annoncelocation->title.' | Prix: '.$this->annoncelocation->price.' | Ville: '.$this->annoncelocation->city->name.' | Categorie: '.$this->annoncelocation->categoryannoncelocation->name)
            ->from($this->userFrom->email,config('app.name'))
            ->line($this->fromBodyUser)
            ->action('Visiter l\'annonce', url(route('annoncelocationbycategoryannoncereservationslug.site',
                [
                    $this->annoncelocation->annoncetype->slug,
                    $this->annoncelocation->categoryannoncelocation->slug,
                    $this->annoncelocation->city->slug,
                    $this->annoncelocation->slug,
                ])))
            ->salutation('Visiter le site pour en savoir plus');

    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'annoncelocationID' => $this->annoncelocation->id,
            'annoncelocationTitle' => $this->annoncelocation->title,
            'userFromName' => $this->userFrom->first_name
        ];
    }
}
