<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\contactusersadvert;
use Faker\Generator as Faker;

$factory->define(contactusersadvert::class, function (Faker $faker) {
    $myslug = now();
    return [
        'full_name' => $faker->firstNameMale,
        'slug' => str_slug($myslug),
        'email' => $faker->email,
        'subject' => $faker->text(50),
        'message' => $faker->paragraph,
    ];
});
