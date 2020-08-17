<?php

namespace App\Notifications\Comments;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentEmploymentNotification extends Notification implements ShouldQueue
{
    use Queueable;


    protected $fromBodyUser;
    protected $employment;
    protected $userFrom;

    /**
     * CommentAnnoncelocationNotification constructor.
     * @param $fromBodyUser
     * @param $employment
     * @param $userFrom
     */
    public function __construct($fromBodyUser,$employment,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->employment = $employment;
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
            ->greeting($this->userFrom->first_name.' a posté un commentaire sur cette annonce ci-dessous')
            ->subject('Nouveau commentaire')
            ->line('ID: '.$this->employment->id.' | Titre de l\'annonce: '.$this->employment->title.' | Ville: '.$this->employment->city->name.' | Categorie: '.$this->employment->categoryemployment->name)
            ->from($this->userFrom->email,config('app.name'))
            ->line($this->fromBodyUser)
            ->action('Voir l\'annonce', url(route('employmentslug_site',
                [
                    $this->employment->categoryemployment->slug,
                    $this->employment->city->slug,
                    $this->employment->user->slug,
                    $this->employment->slug,
                ])))
            ->salutation('Visiter le site pour en savoir plus');

    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'userToID' => $this->employment->id,
            'userToTitle' => $this->employment->title,
            'userToSlugCity' => $this->employment->city->slug,
            'userToUserSlug' =>  $this->employment->user->slug,
            'userToSlug' =>   $this->employment->slug,
            'userFromName' => $this->userFrom->first_name,
            'userFromBodyUser' => $this->fromBodyUser,
        ];
    }
}
