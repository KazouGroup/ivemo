<?php

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\contactuser;
use App\Model\imagereservation;
use App\Model\reservation;
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
        factory(annoncelocation::class, 500)->create();
        factory(annoncevente::class, 200)->create();
        factory(annoncereservation::class, 200)->create();
        factory(reservation::class, 600)->create();
        factory(imagereservation::class, 900)->create();
        factory(contactuser::class, 1000)->create();

    }
}
