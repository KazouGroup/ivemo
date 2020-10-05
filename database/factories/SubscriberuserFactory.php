<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\subscriberuser;
use App\Models\user;
use Faker\Generator as Faker;

$factory->define(subscriberuser::class, function (Faker $faker) {
    return [
        'ip' => $faker->ipv4,
        'user_email' => $faker->freeEmail,
        'user_id' => user::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
