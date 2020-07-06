<?php

namespace App\Jobs;

use App\Notifications\ResponsecommentNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class ResponsecommentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $comment;
    protected $userFrom;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$comment,$userFrom)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->comment = $comment;
        $this->userFrom = $userFrom;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

             $this->comment->user
                 ->notify(new ResponsecommentNotification(
                    $this->fromBodyUser,
                    $this->comment,
                    $this->userFrom));


        }catch (\Exception $e){
            Log::error($e->getMessage());
        }


    }
}
