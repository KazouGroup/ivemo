<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\subscriber;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(subscriber::class, function (Faker $faker) {
    return [
        'ip' => $faker->ipv4,
        'user_email' => $faker->freeEmail,
        'user_id' => user::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
