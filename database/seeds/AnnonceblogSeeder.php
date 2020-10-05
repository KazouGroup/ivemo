<?php

use App\Models\avisuser;
use App\Models\blogannoncelocation;
use App\Models\blogannoncereservation;
use App\Models\blogannoncevente;
use App\Models\responseavisuser;
use App\Models\workwithus;
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

        if (config('app.env') !== 'production') {
            $this->addTestData();
        }
    }

    private function addTestData()
    {
        //factory(blogannoncereservation::class, 100)->create();
        //factory(blogannoncelocation::class, 100)->create();
        //factory(blogannoncevente::class, 100)->create();
        //factory(avisuser::class, 150)->create();
        //factory(responseavisuser::class, 500)->create();
        //factory(workwithus::class, 1)->create();
    }
}
