<?php

namespace App\Notifications\Contacts;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class ContactuserreservationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $fromPhoneUser;
    protected $fromMessageUser;
    protected $userFrom;
    protected $annoncereservation;

    /**
     * ContactuserreservationNotification constructor.
     * @param $fromPhoneUser
     * @param $fromMessageUser
     * @param $userFrom
     * @param $annoncereservation
     */
    public function __construct($fromPhoneUser, $fromMessageUser, $userFrom, $annoncereservation)
    {
        $this->fromPhoneUser = $fromPhoneUser;
        $this->fromMessageUser = $fromMessageUser;
        $this->userFrom = $userFrom;
        $this->annoncereservation = $annoncereservation;
    }

    /**
     * @return array
     */
    public function via()
    {
        return ['mail', 'database'];
    }

    /**
     * @return MailMessage
     */
    public function toMail()
    {
        return (new MailMessage)
            ->greeting('Salut ' . $this->annoncereservation->user->first_name)
            ->subject("Contact annonce en reservation sur " . config('app.name'))
            ->salutation('Cordiale')
            ->from($this->userFrom->email, config('app.name'))
            ->line($this->userFrom->first_name . ' vous a contacté sur ce bien ci-dessous en reservation - ' . config('app.name'))
            ->line('ID: ' . $this->annoncereservation->id . ' | Type: ' . $this->annoncereservation->annoncetype->name . ' | Titre de l\'annonce: ' . $this->annoncereservation->title . ' | Prix: ' . $this->annoncereservation->price . ' | Ville: ' . $this->annoncereservation->city->name . ' | Categorie: ' . $this->annoncereservation->categoryannoncereservation->name)
            ->line($this->fromMessageUser)
            ->action('En savoir plus', url(route('personal_mails_annoncereservations.site')))
            ->line('Thank you for using our application!');
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'userToID' => $this->annoncereservation->id,
            'userToTitle' => $this->annoncereservation->title,
            'userToSlugCity' => $this->annoncereservation->city->slug,
            'userToUserSlug' => $this->annoncereservation->user->slug,
            'userFromName' => $this->userFrom->first_name,
            'userFromBodyUser' => $this->fromMessageUser,
        ];
    }
}
