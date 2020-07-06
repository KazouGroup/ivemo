<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactworkwithusToUserNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $workwithus;

    /**
     * ContactworkwithusNotification constructor.
     * @param $fromFullnameUser
     * @param $fromPhoneUser
     * @param $fromEmailUser
     * @param $workwithus
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$workwithus)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->workwithus = $workwithus;
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
                    ->greeting('Salut '.$this->fromFullnameUser)
                    ->subject("Travailler avec nous")
                    ->from(config('app.email'),config('app.name'))
                    ->line('Vous avez postulé a cette annonce ci-dessous - '.config('app.name'))
                    ->line('ID: '.$this->workwithus->id.' | Titre de l\'annonce: '.$this->workwithus->title.' | Categorie: '.$this->workwithus->categoryworkwithus->name.' | Ville: '.$this->workwithus->city->name)
                    ->action('Voir l\'annonce', url(route('work_with_us_show.site',
                        [
                            $this->workwithus->categoryworkwithus->slug,
                            $this->workwithus->slug,
                        ]
                    )))
                    ->salutation('Visite le site pour en savoir plus');
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
