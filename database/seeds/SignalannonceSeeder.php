<?php

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\contactuser;
use App\Model\contactuserslocation;
use App\Model\contactusersvente;
use App\Model\imagereservation;
use App\Model\reservation;
use App\Model\signalannoncelocation;
use App\Model\signalannoncereservation;
use App\Model\signalannoncevente;
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
        factory(signalannoncelocation::class, 5)->create();
        factory(signalannoncereservation::class, 1500)->create();
        factory(signalannoncevente::class, 5)->create();

    }
}
