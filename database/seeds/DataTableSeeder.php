<?php


use App\Model\abonne\subscribeforum;
use App\Model\abonne\subscribemployment;
use App\Model\activitycity;
use App\Model\comment;
use App\Model\followeruser;
use App\Model\like;
use App\Model\signal;
use App\Model\uploadimage;
use Illuminate\Database\Seeder;

class DataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        factory(activitycity::class, 500)->create();
        factory(uploadimage::class, 2500)->create();
        //factory(signal::class, 500)->create();
        //factory(comment::class, 200)->create();
        //factory(like::class, 3500)->create();
        //factory(followeruser::class, 2000)->create();
        //factory(subscribemployment::class, 2000)->create();
        //factory(subscribeforum::class, 2000)->create();

    }
}
