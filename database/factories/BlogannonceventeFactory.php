<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\blogannoncevente;
use App\Model\categoryannoncevente;
use App\Model\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(blogannoncevente::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    $myslug = Str::uuid();
    return [
        'title' => $title,
        'photo' => $faker->imageUrl($width = 1400, $height = 800),
        'slug' => str_slug($title),
        'slugin' => $myslug,
        'status' => $faker->boolean,
        'status_admin' => $faker->boolean,
        'red_time' => $faker->randomDigitNot(5),
        'description' => $faker->realText(rand(10000, 40000)),
        'categoryannoncevente_id' => categoryannoncevente::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
        'created_at' => $faker->dateTime,
    ];
});
