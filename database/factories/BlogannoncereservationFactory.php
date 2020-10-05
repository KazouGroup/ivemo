<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\blogannoncereservation;
use App\Models\categoryannoncereservation;
use App\Models\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(blogannoncereservation::class, function (Faker $faker) {
    $backgroundColor = trim($faker->safeHexcolor, '#');
    $foregroundColor = trim($faker->safeHexcolor, '#');
    $title = $faker->sentence(9);
    $myslug = Str::uuid();
    return [
        'title' => $title,
        'photo' => "https://dummyimage.com/wsvga/" . $backgroundColor . "/". $foregroundColor ."&text=" . $faker->word,
        'slug' => str_slug($title),
        'slugin' => $myslug,
        'status' => true,
        'status_comments' => $faker->boolean,
        //'status_admin' => $faker->boolean,
        'red_time' => $faker->randomDigitNot(5),
        'description' => "<p>".$faker->realText(rand(10000, 20000))."</p>",
        'categoryannoncereservation_id' => categoryannoncereservation::inRandomOrder()->first()->id,
        'user_id' => mt_rand(1, 3),
        'created_at' => $faker->dateTime,
    ];
});
