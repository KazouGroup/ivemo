<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(PermissionTableSeeder::class);
        //$this->call(CompileTableSeeder::class);
        //$this->call(CitiesTableSeeder::class);
        //$this->call(AnnonceSeeder::class);
        //$this->call(AnnonceblogSeeder::class);
        //$this->call(SignalannonceSeeder::class);
    }
}
