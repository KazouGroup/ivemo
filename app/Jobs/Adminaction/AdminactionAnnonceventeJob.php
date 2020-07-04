<?php

namespace App\Jobs\Adminaction;

use App\Notifications\Adminaction\AdminactionAnnonceventeNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AdminactionAnnonceventeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $annoncevente;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($annoncevente)
    {
        $this->annoncevente = $annoncevente;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->annoncevente->user
            ->notify(new AdminactionAnnonceventeNotification(
                $this->annoncevente
            ));
    }
}
