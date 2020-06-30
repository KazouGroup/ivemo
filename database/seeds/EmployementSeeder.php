<?php

use App\Model\avisuser;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\contactuseremployment;
use App\Model\employment;
use App\Model\favorite\favoritemployment;
use App\Model\signaluseremployment;
use App\Model\workwithus;
use Illuminate\Database\Seeder;

class EmployementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(employment::class, 1500)->create();
        factory(contactuseremployment::class, 300)->create();
        factory(signaluseremployment::class, 200)->create();
        factory(favoritemployment::class, 1000)->create();
    }
}
