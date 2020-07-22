<?php


use App\Model\comment;
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

    }
}
