<?php

namespace App\Jobs\Comments;

use App\Notifications\Comments\CommentBlogannoncereservationNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CommentBlogannoncereservationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $blogannoncereservation;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$blogannoncereservation,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->blogannoncereservation = $blogannoncereservation;
        $this->userFrom = $userFrom;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->blogannoncereservation->user
            ->notify(new CommentBlogannoncereservationNotification(
                $this->fromBodyUser,
                $this->blogannoncereservation,
                $this->userFrom
            ));
    }
}
