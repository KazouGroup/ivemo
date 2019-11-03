<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\link;
use App\Model\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

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

$factory->define(link::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(4),
        'user_id' => function () {
            return user::inRandomOrder()->first()->id;
        }
    ];
});
