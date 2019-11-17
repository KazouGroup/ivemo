<?php

use App\Model\categoryfaq;
use App\model\comment;
use App\Model\user;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(comment::class, function (Faker $faker) {
    return [
        'body' => $faker->title,
        'status' => $faker->boolean,
        'user_id' => User::inRandomOrder()->first()->id
    ];
});
