<?php

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\contactuser;
use App\Model\contactuserslocation;
use App\Model\contactusersvente;
use App\Model\imagereservation;
use App\Model\reservation;
use App\Model\subscriber;
use App\Model\subscriberuser;
use Illuminate\Database\Seeder;

class AnnonceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(annoncelocation::class, 2000)->create();
        factory(annoncevente::class, 3000)->create();
        factory(annoncereservation::class, 2000)->create();
        factory(reservation::class, 500)->create();
        factory(imagereservation::class, 1000)->create();
        factory(contactuser::class, 100)->create();
        factory(contactuserslocation::class, 100)->create();
        factory(contactusersvente::class, 100)->create();
        factory(subscriber::class, 10)->create();
        factory(subscriberuser::class, 10)->create();

    }
}
