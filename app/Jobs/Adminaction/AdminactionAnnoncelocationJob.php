<?php

namespace App\Jobs\Adminaction;

use App\Notifications\Adminaction\AdminactionAnnoncelocationNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AdminactionAnnoncelocationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $annoncelocation;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($annoncelocation)
    {
        $this->annoncelocation = $annoncelocation;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->annoncelocation->user
            ->notify(new AdminactionAnnoncelocationNotification(
                $this->annoncelocation
            ));
    }
}
