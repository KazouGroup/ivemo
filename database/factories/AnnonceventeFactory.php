<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\annoncevente;
use App\Models\categoryannoncevente;
use App\Models\city;
use App\Models\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(annoncevente::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'price' => $faker->randomNumber(8),
        'surface' => $faker->randomNumber(4),
        'status' => true,
        'status_comments' => $faker->boolean,
        //'status_admin' => $faker->boolean,
        'district' => $faker->streetName,
        'rooms' => $faker->randomDigitNot(5),
        'pieces' => $faker->randomDigitNot(5),
        'annoncetype_id' => 2,
        'slug' => str_slug($title),
        'slugin' => Str::uuid(),
        'description' => "<p>".$faker->realText(rand(1000, 2000))."</p>",
        'categoryannoncevente_id' => categoryannoncevente::inRandomOrder()->first()->id,
        'city_id' => city::where(['status' => 1])->inRandomOrder()->first()->id,
        'user_id' => mt_rand(1, 3),
        'created_at' => $faker->dateTime,
    ];
});
