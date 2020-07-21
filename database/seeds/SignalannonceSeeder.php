<?php

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\contactuser;
use App\Model\contactusersvente;
use App\Model\imagereservation;
use App\Model\reservation;
use App\Model\signalannoncereservation;
use App\Model\subscriber;
use App\Model\subscriberuser;
use Illuminate\Database\Seeder;

class SignalannonceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(signalannoncereservation::class, 100)->create();

    }
}
