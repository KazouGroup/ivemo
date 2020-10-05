<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\annoncereservation;
use App\Models\imagereservation;
use Faker\Generator as Faker;

$factory->define(imagereservation::class, function (Faker $faker) {
    $backgroundColor = trim($faker->safeHexcolor, '#');
    $foregroundColor = trim($faker->safeHexcolor, '#');
    return [
        'photo' => "https://dummyimage.com/wsvga/" . $backgroundColor . "/". $foregroundColor ."&text=" . $faker->word,
        'annoncereservation_id' => annoncereservation::inRandomOrder()->first()->id,
    ];
});
