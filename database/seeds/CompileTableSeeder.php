<?php

use App\Model\annoncetype;
use App\Model\categoryannoncereservation;
use App\Model\categoryfaq;
use App\Model\color;
use App\Model\contact;
use App\Model\categoryannoncelocation;
use App\Model\categoryannoncevente;
use App\Model\faq;
use App\Model\link;
use App\Model\testimonial;
use App\Model\user;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CompileTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->addDefaultUtenti();

        if (config('app.env') !== 'production') {
            $this->addTestData();
        }
    }

    private function addDefaultUtenti()
    {
        // Truncate table
        Schema::disableForeignKeyConstraints();
        user::truncate();
        Schema::enableForeignKeyConstraints();

        $god = User::create([
            'username' =>'bokino12',
            'first_name' =>'Boclair Temgoua',
            'slug' => str_slug('Boclair Temgoua'),
            'status_user' => 1,
            //'birthday' => now(),
            'email' => "temgoua2012@gmail.com",
            'color_name' => "primary",
            "password" => bcrypt('0000000'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
        $god->syncRoles('super-admin');


        $colors = [
            ['name' => 'danger','user_id' => 1],
            ['name' => 'info', 'user_id' => 1],
            ['name' => 'success ', 'user_id' => 1],
            ['name' => 'warning ', 'user_id' => 1],
            ['name' => 'rose ', 'user_id' => 1],
            ['name' => 'dark ','user_id' => 1],
            ['name' => 'primary ','user_id' => 1],
        ];


        foreach($colors as $item)
            color::create($item);

            $categoryannoncelocations = [
                ['name' => 'Appartement','slug' => str_slug('Appartement'),'user_id'=> 1],
                ['name' => 'Chambre','slug' => str_slug('Chambre'),'user_id'=> 1],
                ['name' => 'Loft, atelier & surface','slug' => str_slug('Loft, atelier & surface'),'user_id'=> 1],
                ['name' => 'Maison','slug' => str_slug('Maison'),'user_id'=> 1],
                ['name' => 'Studio','slug' => str_slug('Studio'),'user_id'=> 1],
            ];

            foreach($categoryannoncelocations as $item)
            categoryannoncelocation::create($item);

            $categoryannonceventes = [
                ['name' => 'Appartement','slug' => str_slug('Appartement'),'user_id'=> 1],
                ['name' => 'Maison','slug' => str_slug('Maison'),'user_id'=> 1],
                ['name' => 'Terrain','slug' => str_slug('Terrain'),'user_id'=> 1],
                ['name' => 'Voiture','slug' => str_slug('Voiture'),'user_id'=> 1],
            ];

            foreach($categoryannonceventes as $item)
            categoryannoncevente::create($item);

            $annoncetypes = [
                ['name' => 'Locations','slug'=> 'location'],
                ['name' => 'Ventes','slug'=> 'ventes'],
                ['name' => 'Reservations','slug'=> 'reservations']
            ];

            foreach ($annoncetypes as $item)
                annoncetype::create($item);

            $categoryannoncereservations = [
                ['name' => 'Appartement','slug' => str_slug('Appartement'),'user_id'=> 1],
                ['name' => 'Chambre d\'hotel','slug' => str_slug('Chambre d\'hotel'),'user_id'=> 1],
                ['name' => 'Suite d\'hotel','slug' => str_slug('Suite d\'hotel'),'user_id'=> 1],
                ['name' => 'Hall d\'hotel','slug' => str_slug('Hall d\'hotel'),'user_id'=> 1],
                ['name' => 'Villa','slug' => str_slug('Villa'),'user_id'=> 1],
            ];

        foreach ($categoryannoncereservations as $item)
            categoryannoncereservation::create($item);
    }

    private function addTestData()
    {
        // Seeds
        $admin_user = User::create([
            'username' =>'randrino17',
            'first_name' =>'Nzeukang',
            'slug' => str_slug('Nzeukang'),
            'color_name' => "info",
            //'birthday' => now(),
            'status_user' => 1,
            'email' => "nzeukangrandrin@gmail.com",
            "password" => bcrypt('123456789'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
        $admin_user->syncRoles('super-admin');


        factory(user::class, 100)->create();
        factory(categoryfaq::class, 5)->create();
        factory(faq::class, 100)->create();
        factory(contact::class, 200)->create();
        factory(link::class, 5)->create();

        factory(testimonial::class, 500)->create();

        // Output
        $this->command->info('Test data added.');
    }

}
