<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Model\annoncereservation;
use App\Model\categoryannoncereservation;
use App\Model\city;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(annoncereservation::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    $disponible_date = $faker->dateTimeBetween('-2 years','+10 years');
    return [
        'title' => $title,
        'district' => $faker->city,
        'status' => true,
        'status_admin' => true,
        'description' => $faker->realText(rand(10000, 40000)),
        'price' => $faker->randomNumber(7),
        'disponible_date' => $disponible_date,
        'annoncetype_id' => 3,
        'slug' => str_slug($title),

        'categoryannoncereservation_id' => categoryannoncereservation::inRandomOrder()->first()->id,
        'city_id' => city::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
