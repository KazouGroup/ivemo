<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\avisuser;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(avisuser::class, function (Faker $faker) {
    return [
        'ip' => $faker->ipv4,
        'status' => $faker->boolean,
        'description' => $faker->realText(rand(200, 210)),
        'response_description' => $faker->realText(rand(200, 210)),
        'from_id' => user::inRandomOrder()->first()->id,
        'to_id' => user::inRandomOrder()->first()->id,
    ];
});
