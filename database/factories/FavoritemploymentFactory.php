<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\favorite\favoritemployment;
use App\Model\employment;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(favoritemployment::class, function (Faker $faker) {
    return [
        'user_id' => user::inRandomOrder()->first()->id,
        'employment_id' => employment::inRandomOrder()->first()->id,
    ];
});
