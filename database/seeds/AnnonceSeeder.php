<?php

use App\Model\annoncelocation;
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
        factory( annoncelocation::class, 200)->create();

    }
}
