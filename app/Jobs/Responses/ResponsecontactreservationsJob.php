<?php

namespace App\Jobs\Responses;

use App\Notifications\Responses\ResponsecontactreservationNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class ResponsecontactreservationsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fromBodyUser;
    protected $annoncereservation;
    protected $contactservice;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($fromBodyUser,$annoncereservation,$contactservice)
    {
        $this->fromBodyUser = $fromBodyUser;
        $this->annoncereservation = $annoncereservation;
        $this->contactservice = $contactservice;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

             $this->contactservice->to
                 ->notify(new ResponsecontactreservationNotification(
                    $this->fromBodyUser,
                    $this->annoncereservation,
                    $this->contactservice));

        }catch (\Exception $e){
            Log::error($e->getMessage());
        }


    }
}
