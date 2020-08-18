<?php

namespace App\Notifications\Comments;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentBlogannonceventeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromBodyUser;
    protected $blogannoncevente;
    protected $userFrom;

    /**
     * CommentBlogannonceventeNotification constructor.
     * @param $fromBodyUser
     * @param $blogannoncevente
     * @param $userFrom
     */
    public function __construct($fromBodyUser,$blogannoncevente,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->blogannoncevente = $blogannoncevente;
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
            ->greeting($this->userFrom->first_name.' a posté commentaire sur cette annonce ci-dessous')
            ->subject('Nouveau commentaire')
            ->line('ID: '.$this->blogannoncevente->id.' | Titre de l\'article: '.$this->blogannoncevente->title.' | Categorie: '.$this->blogannoncevente->categoryannoncevente->name)
            ->from($this->userFrom->email,config('app.name'))
            ->line($this->fromBodyUser)
            ->action('Visiter l\'annonce', url(route('blogannoncecategoryventeslug_site',
                [
                    $this->blogannoncevente->categoryannoncevente->slug,
                    $this->blogannoncevente->created_at->format('Y-m-d'),
                    $this->blogannoncevente->user->slug,
                    $this->blogannoncevente->slug,
                ])))
            ->salutation('Visiter le site pour en savoir plus');

    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'userToID' => $this->blogannoncevente->id,
            'userToTitle' => $this->blogannoncevente->title,
            'userToSlug' =>   $this->blogannoncevente->slug,
            'userFromName' => $this->userFrom->first_name,
            'userFromBodyUser' => $this->fromBodyUser,
        ];
    }
}
