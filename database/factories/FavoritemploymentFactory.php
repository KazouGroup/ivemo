<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\favorite\favoritemployment;
use App\Models\employment;
use App\Models\user;
use Faker\Generator as Faker;

$factory->define(favoritemployment::class, function (Faker $faker) {
    return [
        'user_id' => user::inRandomOrder()->first()->id,
        'employment_id' => employment::inRandomOrder()->first()->id,
    ];
});
