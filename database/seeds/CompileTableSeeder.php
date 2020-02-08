<?php

use App\Model\annoncetype;
use App\Model\categoryannoncereservation;
use App\Model\categoryfaq;
use App\Model\color;
use App\Model\contact;
use App\Model\categoryannoncelocation;
use App\Model\categoryannoncevente;
use App\Model\contactuser;
use App\Model\faq;
use App\Model\link;
use App\Model\teamuser;
use App\Model\testimonial;
use App\Model\user;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

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
        $faker = Faker::create();
        // Truncate table
        Schema::disableForeignKeyConstraints();
        user::truncate();
        Schema::enableForeignKeyConstraints();

        $god = User::create([
            'username' =>'bokino12',
            'first_name' =>'Boclair Temgoua',
            'slug' => 'boclair_temgoua',
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
                ['name' => 'Appartement','slug' => str_slug('Appartement'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
                ['name' => 'Chambre','slug' => str_slug('Chambre'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
                ['name' => 'Loft, atelier & surface','slug' => str_slug('Loft, atelier & surface'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
                ['name' => 'Maison','slug' => str_slug('Maison'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
                ['name' => 'Studio','slug' => str_slug('Studio'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
            ];

            foreach($categoryannoncelocations as $item)
            categoryannoncelocation::create($item);

            $categoryannonceventes = [
                ['name' => 'Appartement','slug' => str_slug('Appartement'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'color_name' => 'info','user_id'=> 1],
                ['name' => 'Maison','slug' => str_slug('Maison'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'color_name' => 'success','user_id'=> 1],
                ['name' => 'Terrain','slug' => str_slug('Terrain'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'color_name' => 'danger','user_id'=> 1],
                ['name' => 'Voiture','slug' => str_slug('Voiture'),'photo'=> $faker->imageUrl($width = 1400, $height = 800),'color_name' => 'primary','user_id'=> 1],
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
                ['name' => 'Appartement','slug' => str_slug('Appartement'),'color_name' => 'info','photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
                ['name' => 'Chambre d\'hotel','slug' => str_slug('Chambre d-hotel'),'color_name' => 'primary','photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
                ['name' => 'Suite d\'hotel','slug' => str_slug('Suite d-hotel'),'color_name' => 'success','photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
                ['name' => 'Hall d\'hotel','slug' => str_slug('Hall d-hotel'),'color_name' => 'danger','photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
                ['name' => 'Villa','slug' => str_slug('Villa'),'color_name' => 'success','photo'=> $faker->imageUrl($width = 1400, $height = 800),'user_id'=> 1],
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
        factory(contactuser::class, 500)->create();
        factory(teamuser::class, 200)->create();
        factory(link::class, 5)->create();

        factory(testimonial::class, 500)->create();

        // Output
        $this->command->info('Test data added.');
    }

}
