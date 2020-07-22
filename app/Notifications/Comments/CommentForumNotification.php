<?php

namespace App\Notifications\Comments;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentForumNotification extends Notification implements ShouldQueue
{
    use Queueable;


    protected $fromBodyUser;
    protected $forum;
    protected $userFrom;

    /**
     * CommentAnnoncelocationNotification constructor.
     * @param $fromBodyUser
     * @param $forum
     * @param $userFrom
     */
    public function __construct($fromBodyUser,$forum,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->forum = $forum;
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
            ->greeting($this->userFrom->first_name.' à poster commentaire sur le post ci-dessous')
            ->subject('Nouveau commentaire')
            ->line('ID: '.$this->forum->id.' | Titre du post: '.$this->forum->title.' | Categorie: '.$this->forum->categoryforum->name)
            ->from($this->userFrom->email,config('app.name'))
            ->line($this->fromBodyUser)
            ->action('Voir le poste', url(route('forumscategoryslugin_site',
                [
                    $this->forum->categoryforum->slug,
                    $this->forum->slugin,
                ])))
            ->salutation('Visiter le site pour en savoir plus');

    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'forumID' => $this->forum->id,
            'forumTitle' => $this->forum->title,
            'userFromName' => $this->userFrom->first_name
        ];
    }
}
