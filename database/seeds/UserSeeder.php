<?php

use App\Models\activitycity;
use App\Models\uploadimage;
use App\Models\user;
use App\Models\categoryfaq;
use App\Models\faq;
use App\Models\contact;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(user::class, 1)->create();
        factory(categoryfaq::class, 1)->create();
        factory(faq::class, 1)->create();
        factory(contact::class, 20)->create();

        // Output
        $this->command->info('Test data added.');
    }
}
