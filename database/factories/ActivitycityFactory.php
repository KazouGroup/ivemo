<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\activitycity;
use App\Model\city;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(activitycity::class, function (Faker $faker) {

    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'status' => true,
        'status_comments' => $faker->boolean,
        'status_link_contact' => $faker->boolean,
        'slug' => str_slug($title),
        'slugin' => Str::uuid(),
        'description' => "<p>".$faker->realText(rand(1000, 2000))."</p>",
        'city_id' => city::where(['status' => 1])->inRandomOrder()->first()->id,
        'user_id' => mt_rand(1, 3),
        'created_at' => $faker->dateTime,
    ];
});
