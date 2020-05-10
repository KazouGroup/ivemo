<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\signalannoncelocation;
use App\Model\signalannoncereservation;
use App\Model\signalannoncevente;
use Faker\Generator as Faker;

$factory->define(signalannoncelocation::class, function (Faker $faker) {
    $title = $faker->sentence(15);
    return [
        'full_name' => $title,
        'object' => $faker->city,
        'email' => $faker->freeEmail,
        'message' => $faker->realText(rand(50, 100)),
        'annoncelocation_id' => annoncelocation::inRandomOrder()->first()->id,
    ];
});

$factory->define(signalannoncereservation::class, function (Faker $faker) {
    $title = $faker->sentence(15);
    return [
        'full_name' => $title,
        'object' => $faker->city,
        'email' => $faker->freeEmail,
        'message' => $faker->realText(rand(50, 100)),
        'annoncereservation_id' => annoncereservation::inRandomOrder()->first()->id,
    ];
});

$factory->define(signalannoncevente::class, function (Faker $faker) {
    $title = $faker->sentence(15);
    return [
        'full_name' => $title,
        'object' => $faker->city,
        'email' => $faker->freeEmail,
        'message' => $faker->realText(rand(50, 100)),
        'annoncevente_id' => annoncevente::inRandomOrder()->first()->id,
    ];
});
