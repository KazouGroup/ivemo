<?php

use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
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
        factory(blogannoncereservation::class, 1000)->create();
        factory(blogannoncelocation::class, 1000)->create();
    }
}
