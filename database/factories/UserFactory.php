<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\color;
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

$factory->define(user::class, function (Faker $faker) {
    $users =  [
        'username' => $faker->unique()->userName,
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'birthday' => now(),
        'email' => $faker->unique()->safeEmail,
        'description' => $faker->realText,
        'status_user' => $faker->boolean,
        'color_name' => color::inRandomOrder()->first()->name,
        'email_verified_at' => $faker->dateTime,
        'avatar' => $faker->imageUrl($width = 400, $height = 400),
        'avatarcover' => $faker->imageUrl,
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
        'created_at' => $faker->dateTime,
    ];


    return $users;
});
