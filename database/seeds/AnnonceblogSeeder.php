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
        factory(blogannoncereservation::class, 2000)->create();
        factory(blogannoncelocation::class, 2000)->create();
        factory(blogannoncevente::class, 2000)->create();
        factory(avisuser::class, 100)->create();
        factory(workwithus::class, 30)->create();
    }
}
