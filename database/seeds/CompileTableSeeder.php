<?php

use App\Model\faq;
use App\Model\link;
use App\Model\user;
use Illuminate\Database\Seeder;
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
            'name' =>'Boclair Temgoua',
            'email' => "temgoua2012@gmail.com",
            "password" => bcrypt('0000000'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
        $god->syncRoles('super-admin');
    }

    private function addTestData()
    {
        // Seeds
        $admin_user = User::create([
            'username' =>'randrino17',
            'name' =>'Nzeukang',
            'email' => "nzeukangrandrin@gmail.com",
            "password" => bcrypt('123456789'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
        $admin_user->syncRoles('super-admin');


        factory(user::class, 10)->create();
        factory(faq::class, 500)->create();
        factory(link::class, 5)->create();

        // Output
        $this->command->info('Test user added.');
    }

}
