<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\categoryforum;
use App\Models\forum;
use App\Models\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(forum::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'status' => true,
        'slug' => str_slug($title),
        'slugin' => Str::uuid(),
        'description' => "<p>".$faker->realText(rand(1000, 2000))."</p>",
        'categoryforum_id' => categoryforum::inRandomOrder()->first()->id,
        'user_id' => mt_rand(1, 2),
        //'user_id' => user::inRandomOrder()->first()->id,
        'created_at' => $faker->dateTime,
    ];
});
