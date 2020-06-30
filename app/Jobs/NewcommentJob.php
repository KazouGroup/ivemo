<?php

namespace App\Jobs;

use App\Notifications\NewcommentNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

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
        try {


            Notification::route('mail',$this->annoncereservation->user->email)
                ->notify(new NewcommentNotification(
                    $this->fromBodyUser,
                    $this->annoncereservation,
                    $this->userFrom));


        }catch (\Exception $e){
            Log::error($e->getMessage());
        }


    }
}
