<?php


use App\Model\abonne\subscribeforum;
use App\Model\abonne\subscribemployment;
use App\Model\comment;
use App\Model\followeruser;
use App\Model\like;
use App\Model\signal;
use Illuminate\Database\Seeder;

class SignalTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(signal::class, 1500)->create();
        factory(comment::class, 3000)->create();
        factory(like::class, 3500)->create();
        factory(followeruser::class, 2000)->create();
        factory(subscribemployment::class, 2000)->create();
        factory(subscribeforum::class, 2000)->create();

    }
}
