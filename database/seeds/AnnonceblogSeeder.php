<?php

use App\Model\avisuser;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\workwithus;
use Illuminate\Database\Seeder;

class AnnonceblogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(blogannoncereservation::class, 500)->create();
        factory(blogannoncelocation::class, 500)->create();
        factory(blogannoncevente::class, 500)->create();
        factory(avisuser::class, 100)->create();
        factory(workwithus::class, 30)->create();
    }
}
