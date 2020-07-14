<?php

namespace App\Jobs\Comments;

use App\Notifications\Comments\CommentEmploymentNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CommentEmploymentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $employment;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$employment,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->employment = $employment;
        $this->userFrom = $userFrom;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->employment->user
            ->notify(new CommentEmploymentNotification(
                $this->fromBodyUser,
                $this->employment,
                $this->userFrom
            ));
    }
}
