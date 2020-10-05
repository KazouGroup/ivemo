<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\categoryfaq;
use App\Models\faq;
use App\Models\user;
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

$factory->define(faq::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    return [
        'title' => $title,
        'slug' => str_slug($title),
        'ip' => $faker->ipv4,
        'status' => $faker->boolean,
        'body' => $faker->paragraph,
        'categoryfaq_id' => categoryfaq::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
    ];
});
