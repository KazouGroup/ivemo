<?php

namespace App\Jobs\Comments;

use App\Notifications\Comments\CommentEmploymentNotification;
use App\Notifications\Comments\CommentForumNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CommentForumJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $forum;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$forum,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->forum = $forum;
        $this->userFrom = $userFrom;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->forum->user
            ->notify(new CommentForumNotification(
                $this->fromBodyUser,
                $this->forum,
                $this->userFrom
            ));
    }
}
