<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Model\testimonial;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(testimonial::class, function (Faker $faker) {
    return [
        'role' => $faker->catchPhrase,
        'ip' => $faker->ipv4,
        'status' => $faker->boolean,
        'body' => $faker->paragraph,
        'slug' => $faker->uuid,
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
