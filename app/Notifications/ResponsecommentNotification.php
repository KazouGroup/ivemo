<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResponsecommentNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromBodyUser;
    protected $comment;
    protected $userFrom;

    /**
     * ResponsecommentNotification constructor.
     * @param $fromBodyUser
     * @param $comment
     * @param $userFrom
     */
    public function __construct($fromBodyUser,$comment,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->comment = $comment;
        $this->userFrom = $userFrom;
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
                    ->greeting($this->userFrom->first_name.' a répondu à votre commentaire')
                    ->subject('Réponse du commentaire')
                    ->line('Commentaire: '.$this->comment->body.' | Commentaire posté le: '.$this->comment->created_at->format('m/d/Y').' à '.$this->comment->created_at->format('H:i:s'))
                    ->salutation('Visite le site pour en savoir plus')
                    ->from($this->userFrom->email,config('app.name'))
                    ->line($this->fromBodyUser);
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
