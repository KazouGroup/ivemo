<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\user;
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
        //'status_admin' => $faker->boolean,
        'red_time' => $faker->randomDigitNot(5),
        'description' => "<p>".$faker->realText(rand(10000, 20000))."</p>",
        'categoryannoncelocation_id' => categoryannoncelocation::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
