<?php

use App\Model\conseillocation;
use App\Model\conseilvente;
use Illuminate\Database\Seeder;

class ConseilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       factory(conseilvente::class, 200)->create();
       factory(conseillocation::class, 200)->create();
    }
}
