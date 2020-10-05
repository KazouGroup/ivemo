<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models;
use App\Models\annoncereservation;
use App\Models\reservation;
use App\Models\user;
use Faker\Generator as Faker;

$factory->define(reservation::class, function (Faker $faker) {
   // $start_reservation = $faker->dateTimeBetween('-2 years','+1 years');
   // $end_reservation = $faker->dateTimeBetween($start_reservation,'+20 years');

    return [
        'full_name' => $faker->firstName.' '.$faker->lastName,
        'email' => $faker->freeEmail,
        'phone' => $faker->phoneNumber,
        'status' => $faker->boolean,
        'adult_number' => $faker->randomNumber(4),
        'children_number' => $faker->randomNumber(4),
        //'start_reservation' => $start_reservation->format('Y-m-d'),
        //'end_reservation' => $end_reservation->format('Y-m-d'),
        'description' => $faker->realText(rand(100, 200)),
        'annoncereservation_id' => annoncereservation::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
