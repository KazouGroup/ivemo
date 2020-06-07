<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\employment;
use App\Model\signaluseremployment;
use Faker\Generator as Faker;

$factory->define(signaluseremployment::class, function (Faker $faker) {
    $title = $faker->sentence(15);
    return [
        'full_name' => $title,
        'subject' => $faker->city,
        'email' => $faker->freeEmail,
        'message' => $faker->realText(rand(50, 100)),
        'employment_id' => employment::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
