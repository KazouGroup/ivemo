<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\annoncereservation;
use App\Model\imagereservation;
use Faker\Generator as Faker;

$factory->define(imagereservation::class, function (Faker $faker) {
    return [
        'photo'=> $faker->imageUrl($width = 1400, $height = 800),
        'annoncereservation_id' => annoncereservation::inRandomOrder()->first()->id,
    ];
});
