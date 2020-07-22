<?php


use App\Model\contactservice;
use App\Model\employment;
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
        factory(employment::class, 500)->create();
        factory(contactservice::class, 1000)->create();
    }
}
