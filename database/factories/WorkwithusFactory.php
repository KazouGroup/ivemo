<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\categoryworkwithus;
use App\Models\city;
use App\Models\user;
use App\Models\workwithus;
use Faker\Generator as Faker;

$factory->define(workwithus::class, function (Faker $faker) {
    $backgroundColor = trim($faker->safeHexcolor, '#');
    $foregroundColor = trim($faker->safeHexcolor, '#');
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'slug' => str_slug($title),
        'status' => $faker->boolean,
        'status_comments' => $faker->boolean,
        'photo' => "https://dummyimage.com/wsvga/" . $backgroundColor . "/". $foregroundColor ."&text=" . $faker->word,
        'description' => $faker->realText(rand(1000, 2000)),
        'categoryworkwithus_id' => categoryworkwithus::inRandomOrder()->first()->id,
        'city_id' => city::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
