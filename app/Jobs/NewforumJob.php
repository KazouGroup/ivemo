<?php

namespace App\Jobs;

use App\Notifications\NewforumNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class NewforumJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $emailsubscribeforum;
    protected $fromTitleUser;
    protected $fromUser;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($emailsubscribeforum,$fromTitleUser,$fromUser)
    {
        $this->emailsubscribeforum = $emailsubscribeforum;
        $this->fromTitleUser = $fromTitleUser;
        $this->fromUser = $fromUser;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

            if($this->emailsubscribeforum->count() === 0){

                Notification::route('mail',  $this->fromUser->email)
                    ->notify(new NewforumNotification($this->fromUser,$this->fromTitleUser));

            }else{
                foreach ($this->emailsubscribeforum as $item){

                    $emailData = new NewforumNotification($this->fromUser,$this->fromTitleUser);

                    Notification::route('mail', $item->user->email)
                        ->notify($emailData);continue;

                }
            }


        }catch (\Exception $e){
            Log::error($e->getMessage());
        }
    }
}
