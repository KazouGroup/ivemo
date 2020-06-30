<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\categoryemployment;
use App\Model\city;
use App\Model\employment;
use App\Model\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(employment::class, function (Faker $faker) {
    $backgroundColor = trim($faker->safeHexcolor, '#');
    $foregroundColor = trim($faker->safeHexcolor, '#');
    $title = $faker->sentence(9);
    $myslug = Str::uuid();
    return [
        'title' => $title,
        'slug' => str_slug($title),
        'slugin' => $myslug,
        'status' => true,
        //'status_admin' => $faker->boolean,
        'district' => $faker->streetName,
        'price' => $faker->randomNumber(7),
        'photo' => "https://dummyimage.com/wsvga/" . $backgroundColor . "/". $foregroundColor ."&text=" . $faker->word,
        'description' => "<p>".$faker->realText(rand(1000, 2000))."</p>",
        //'categoryemployment_id' => mt_rand(1, 2),
        'categoryemployment_id' => categoryemployment::inRandomOrder()->first()->id,
        'city_id' => city::where(['status' => 1])->inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
        'created_at' => $faker->dateTime,
    ];
});
