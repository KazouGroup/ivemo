<?php

namespace App\Jobs;

use App\Notifications\NewcommentNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NewcommentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $annoncereservation;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$annoncereservation,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncereservation = $annoncereservation;
        $this->userFrom = $userFrom;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Bon à savoir l'email de l'utilisateur est directement capture ici automatiquement
        // "$this->annoncereservation->user" qui pouvais etre ecrite ainsi
        // "Notification::route('mail',   $this->annoncereservation->user->email)" cette partie ce code ne
        // m'envoie pas les notification dans la base donner

        $this->annoncereservation->user
            ->notify(new NewcommentNotification(
                $this->fromBodyUser,
                $this->annoncereservation,
                $this->userFrom
            ));
    }
}
