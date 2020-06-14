<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\annoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\city;
use App\Model\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(annoncelocation::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'price' => $faker->randomNumber(7),
        'surface' => $faker->randomNumber(4),
        'status' => $faker->boolean,
        'status_admin' => $faker->boolean,
        'district' => $faker->streetName,
        'rooms' => $faker->randomDigitNot(3),
        'pieces' => $faker->randomDigitNot(3),
        'award_price' => $faker->randomNumber(4),
        'annoncetype_id' => 1,
        'slug' => str_slug($title),
        'slugin' => Str::uuid(),
        'description' => $faker->realText(rand(100, 200)),
        'categoryannoncelocation_id' => categoryannoncelocation::inRandomOrder()->first()->id,
        'city_id' => city::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
        'created_at' => $faker->dateTime,
    ];
});
