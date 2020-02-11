<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(blogannoncelocation::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'photo' => $faker->imageUrl($width = 1400, $height = 800),
        'slug' => str_slug($title),
        'red_time' => $faker->randomDigitNot(5),
        'description' => $faker->realText(rand(10000, 40000)),
        'categoryannoncelocation_id' => categoryannoncelocation::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
        'created_at' => $faker->dateTime,
    ];
});
