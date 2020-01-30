<?php

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
       factory(conseilvente::class, 100);
    }
}
