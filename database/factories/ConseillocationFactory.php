<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Model\categoryannoncelocation;
use App\Model\conseillocation;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(conseillocation::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'slug' => str_slug($title),
        'photo' => $faker->imageUrl($width = 1000, $height = 900),
        'status' => $faker->boolean,
        'body' => $faker->realText(rand(10000, 40000)),
        'categoryannoncelocation_id' => categoryannoncelocation::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
