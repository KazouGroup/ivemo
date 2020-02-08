<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\teamuser;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(teamuser::class, function (Faker $faker) {
    return [
        'full_name' => $faker->firstName.' '.$faker->lastName,
        'role' => $faker->userName,
        'description' => $faker->realText(rand(20, 60)),
        'status' => $faker->boolean,
        'photo'=> $faker->imageUrl($width = 1400, $height = 800),
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
