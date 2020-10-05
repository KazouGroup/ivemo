<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\teamuser;
use App\Models\user;
use Faker\Generator as Faker;

$factory->define(teamuser::class, function (Faker $faker) {
    return [
        'full_name' => $faker->firstName.' '.$faker->lastName,
        'role' => $faker->userName,
        'description' => $faker->realText(rand(50, 100)),
        'status' => $faker->boolean,
        'photo'=> $faker->imageUrl($width = 400, $height = 400),
        'user_id' => user::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
