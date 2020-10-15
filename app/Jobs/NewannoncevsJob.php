<?php

namespace App\Jobs;

use App\Notifications\NewannoncevsNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class NewannoncevsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $emailsubscribannonce;
    protected $fromUser;
    protected $annoncetype;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($emailsubscribannonce,$fromUser,$annoncetype)
    {
        $this->emailsubscribannonce = $emailsubscribannonce;
        $this->fromUser = $fromUser;
        $this->annoncetype = $annoncetype;
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


            if($this->emailsubscribannonce->count() === 0){

                Notification::route('mail',  $this->fromUser->email)
                    ->notify(new NewannoncevsNotification($this->fromUser,$this->annoncetype));

            }else{
                foreach ($this->emailsubscribannonce as $item){

                    $emailData = new NewannoncevsNotification($this->fromUser,$this->annoncetype);

                    Notification::route('mail', $item->user->email)
                        ->notify($emailData);continue;

                }
            }


        }catch (\Exception $e){
            Log::error($e->getMessage());
        }
    }
}
