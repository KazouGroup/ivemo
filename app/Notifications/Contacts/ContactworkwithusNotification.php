<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactworkwithusNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromFullnameUser;
    protected $fromPhoneUser;
    protected $fromEmailUser;
    protected $workwithus;
    protected $item;

    /**
     * ContactworkwithusNotification constructor.
     * @param $fromFullnameUser
     * @param $fromPhoneUser
     * @param $fromEmailUser
     * @param $workwithus
     * @param $item
     */
    public function __construct($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$workwithus,$item)
    {
        $this->fromFullnameUser = $fromFullnameUser;
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromEmailUser = $fromEmailUser;
        $this->workwithus = $workwithus;
        $this->item = $item;
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
                    ->greeting('Salut '.$this->item->first_name)
                    ->subject("Travailler avec nous")
                    ->from($this->fromEmailUser,config('app.name'))
                    ->line($this->fromFullnameUser.' a postulé a cette annonce ci-dessous - '.config('app.name'))
                    ->line('ID: '.$this->workwithus->id.' | Titre de l\'annonce: '.$this->workwithus->title.' | Categorie: '.$this->workwithus->categoryworkwithus->name.' | Ville: '.$this->workwithus->city->name)
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
