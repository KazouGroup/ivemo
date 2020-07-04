<?php

namespace App\Jobs\Comments;

use App\Notifications\Comments\CommentAnnoncelocationNotification;
use App\Notifications\Comments\CommentAnnonceventeNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CommentAnnoncelocationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $annoncelocation;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$annoncelocation,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncelocation = $annoncelocation;
        $this->userFrom = $userFrom;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->annoncelocation->user
            ->notify(new CommentAnnoncelocationNotification(
                $this->fromBodyUser,
                $this->annoncelocation,
                $this->userFrom
            ));
    }
}
