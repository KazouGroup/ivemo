<?php

namespace App\Notifications\Comments;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentBlogannoncereservationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromBodyUser;
    protected $blogannoncereservation;
    protected $userFrom;

    /**
     * CommentBlogannoncereservationNotification constructor.
     * @param $fromBodyUser
     * @param $blogannoncereservation
     * @param $userFrom
     */
    public function __construct($fromBodyUser,$blogannoncereservation,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->blogannoncereservation = $blogannoncereservation;
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
            ->line('ID: '.$this->blogannoncereservation->id.' | Titre de l\'article: '.$this->blogannoncereservation->title.' | Categorie: '.$this->blogannoncereservation->categoryannoncereservation->name)
            ->from($this->userFrom->email,config('app.name'))
            ->line($this->fromBodyUser)
            ->action('Visiter l\'annonce', url(route('blogannoncecategoryreservationslug_site',
                [
                    $this->blogannoncereservation->categoryannoncereservation->slug,
                    $this->blogannoncereservation->created_at->format('Y-m-d'),
                    $this->blogannoncereservation->user->slug,
                    $this->blogannoncereservation->slug,
                ])))
            ->salutation('Visiter le site pour en savoir plus');

    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'blogannoncereservationID' => $this->blogannoncereservation->id,
            'blogannoncereservationTitle' => $this->blogannoncereservation->title,
            'blogannoncereservationCategory' => $this->blogannoncereservation->categoryannoncereservation->name,
            'userFromName' => $this->userFrom->first_name
        ];
    }
}
