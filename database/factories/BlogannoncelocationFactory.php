<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\blogannoncelocation;
use App\Models\categoryannoncelocation;
use App\Models\user;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(blogannoncelocation::class, function (Faker $faker) {
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
        'categoryannoncelocation_id' => categoryannoncelocation::inRandomOrder()->first()->id,
        'user_id' => mt_rand(1, 3),
        //'user_id' => user::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
