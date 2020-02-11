<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\annoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\city;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(annoncelocation::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'price' => $faker->randomNumber(7),
        'surface' => $faker->randomNumber(4),
        'status' => $faker->boolean,
        'rooms' => $faker->randomDigitNot(3),
        'pieces' => $faker->randomDigitNot(3),
        'award_price' => $faker->randomNumber(4),
        'annoncetype_id' => 1,
        'slug' => str_slug($title),
        'description' => $faker->realText(rand(10000, 40000)),
        'categoryannoncelocation_id' => categoryannoncelocation::inRandomOrder()->first()->id,
        'city_id' => city::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
