<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\contactuser;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(contactuser::class, function (Faker $faker) {
    $myslug = $faker->sentence(9);;
    return [
        'full_name' => $faker->firstNameMale,
        'slug' => str_slug($myslug),
        'email' => $faker->email,
        'status_red' => $faker->boolean,
        'subject' => $faker->text(50),
        'message' => $faker->paragraph,
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
