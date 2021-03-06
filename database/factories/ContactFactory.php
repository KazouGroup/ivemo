<?php

use App\Models\contact;
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

$factory->define(contact::class, function (Faker $faker) {
    $myslug = sha1(('YmdHis') . str_random(30));
    return [
        'first_name' => $faker->firstNameMale,
        'last_name' => $faker->firstNameMale,
        'slug' => str_slug($myslug),
        'email' => $faker->email,
        'subject' => $faker->text(50),
        'message' => $faker->paragraph,
        //'created_at' => $faker->dateTime,
    ];
});
