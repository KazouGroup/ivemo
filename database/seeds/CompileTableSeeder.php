<?php

use App\Model\color;
use App\Model\faq;
use App\Model\link;
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
            'status_user' => 1,
            'email' => "temgoua2012@gmail.com",
            'color_name' => "success",
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
    }

    private function addTestData()
    {
        // Seeds
        $admin_user = User::create([
            'username' =>'randrino17',
            'first_name' =>'Nzeukang',
            'color_name' => "info",
            'status_user' => 1,
            'email' => "nzeukangrandrin@gmail.com",
            "password" => bcrypt('123456789'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
        $admin_user->syncRoles('super-admin');


        factory(user::class, 100)->create();
        factory(faq::class, 100)->create();
        factory(link::class, 5)->create();

        // Output
        $this->command->info('Test user added.');
    }

}
