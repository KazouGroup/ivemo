<?php


use App\Models\abonne\subscribeforum;
use App\Models\abonne\subscribemployment;
use App\Models\activitycity;
use App\Models\comment;
use App\Models\followeruser;
use App\Models\like;
use App\Models\signal;
use App\Models\uploadimage;
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
        factory(signal::class, 500)->create();
        factory(comment::class, 200)->create();
        factory(like::class, 3500)->create();
        factory(followeruser::class, 2000)->create();
        factory(subscribemployment::class, 2000)->create();
        factory(subscribeforum::class, 2000)->create();

    }
}
