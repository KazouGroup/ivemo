<?php

namespace App\Notifications\Responses;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResponsecontactreservationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromBodyUser;
    protected $annoncereservation;
    protected $contactservice;

    /**
     * ResponsecommentNotification constructor.
     * @param $fromBodyUser
     * @param $contactservice
     */
    public function __construct($fromBodyUser,$annoncereservation,$contactservice)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncereservation = $annoncereservation;
        $this->contactservice = $contactservice;
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
            ->greeting($this->contactservice->to->first_name.' a répondu à votre message')
            ->subject('Réponse du message')
            ->line('Message: '.substr($this->contactservice->message,0,50).'...'.' | Message posté le: '.$this->contactservice->created_at->format('m/d/Y').' à '.$this->contactservice->created_at->format('H:i:s'))
            ->line($this->contactservice->from->first_name.' '.$this->fromBodyUser)
            ->from($this->contactservice->to->email,config('app.name'))
            ->salutation('Visite le site pour en savoir plus')
            ->action('Voir le message', url(route('contactservice_annoncereservationsbyuserbystatistiqueshow_site',
                    [
                        $this->contactservice->from->slug,
                        $this->annoncereservation->annoncetype->slug,
                        $this->annoncereservation->slugin,
                    ]
                )));
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
