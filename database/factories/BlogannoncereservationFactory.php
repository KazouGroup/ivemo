<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\blogannoncereservation;
use App\Model\categoryannoncereservation;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(blogannoncereservation::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'photo' => $faker->imageUrl($width = 1400, $height = 400),
        'slug' => str_slug($title),
        'description' => $faker->realText(rand(10000, 40000)),
        'categoryannoncereservation_id' => categoryannoncereservation::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
