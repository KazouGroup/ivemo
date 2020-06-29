<?php

namespace App\Jobs;

use App\Notifications\NewemployementNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class NewemployementJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $emailsubscribemployment;
    protected $fromUser;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($emailsubscribemployment,$fromUser)
    {
        $this->emailsubscribemployment = $emailsubscribemployment;
        $this->fromUser = $fromUser;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Ici je recupere tous les email des utilisateru aboner a ton canall
        // puis je fais un circle en verifiant au prealabre qu'elle n'ai pas nulle
        try {

            if($this->emailsubscribemployment->count() === 0){

                Notification::route('mail',  $this->fromUser->email)
                    ->notify(new NewemployementNotification($this->fromUser));

            }else{
                foreach ($this->emailsubscribemployment as $item){

                    $emailData = new NewemployementNotification($this->fromUser);

                    Notification::route('mail', $item->user->email)
                        ->notify($emailData);continue;

                }
            }


        }catch (\Exception $e){
            Log::error($e->getMessage());
        }
    }
}
