<?php

namespace App\Jobs\Comments;

use App\Notifications\Comments\CommentBlogannonceventeNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CommentBlogannonceventeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $blogannoncevente;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$blogannoncevente,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->blogannoncevente = $blogannoncevente;
        $this->userFrom = $userFrom;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->blogannoncevente->user
            ->notify(new CommentBlogannonceventeNotification(
                $this->fromBodyUser,
                $this->blogannoncevente,
                $this->userFrom
            ));
    }
}
