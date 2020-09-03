<?php

use App\Model\activitycity;
use App\Model\uploadimage;
use App\Model\user;
use App\Model\categoryfaq;
use App\Model\faq;
use App\Model\contact;
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
        //factory(user::class, 1)->create();
        //factory(categoryfaq::class, 1)->create();
        //factory(faq::class, 1)->create();
        //factory(contact::class, 20)->create();
        //factory(teamuser::class, 150)->create();
        //factory(link::class, 5)->create();

        //factory(testimonial::class, 500)->create();

        // Output
        $this->command->info('Test data added.');
    }
}
