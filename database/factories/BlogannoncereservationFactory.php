<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\blogannoncereservation;
use App\Model\categoryannoncereservation;
use App\Model\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(blogannoncereservation::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    $myslug = Str::uuid();
    return [
        'title' => $title,
        'photo' => $faker->imageUrl($width = 1400, $height = 800),
        'slug' => str_slug($title),
        'slugin' => $myslug,
        'red_time' => $faker->randomDigitNot(5),
        'description' => $faker->realText(rand(10000, 40000)),
        'categoryannoncereservation_id' => categoryannoncereservation::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
         'created_at' => $faker->dateTime,
    ];
});
