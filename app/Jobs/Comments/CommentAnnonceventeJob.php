<?php

namespace App\Jobs\Comments;

use App\Notifications\Comments\CommentAnnonceventeNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CommentAnnonceventeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $annoncevente;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$annoncevente,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncevente = $annoncevente;
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
        // "$this->annoncevente->user" qui pouvais etre ecrite ainsi
        // "Notification::route('mail',   $this->annoncevente->user->email)" cette partie ce code ne
        // m'envoie pas les notification dans la base donner

        $this->annoncevente->user
            ->notify(new CommentAnnonceventeNotification(
                $this->fromBodyUser,
                $this->annoncevente,
                $this->userFrom
            ));
    }
}
