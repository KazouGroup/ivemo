<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\abonne\subscribeforum;
use App\Models\abonne\subscribemployment;
use App\Models\employment;
use App\Models\followeruser;
use App\Models\user;
use Faker\Generator as Faker;

$factory->define(followeruser::class, function (Faker $faker) {
    return [
        'user_id' => user::inRandomOrder()->first()->id,
        'member_id' => mt_rand(1, 2),
    ];
});

$factory->define(subscribemployment::class, function (Faker $faker) {
    return [
        'user_id' => user::inRandomOrder()->first()->id,
        'member_id' => mt_rand(1, 2),
    ];
});

$factory->define(subscribeforum::class, function (Faker $faker) {
    return [
        'user_id' => user::inRandomOrder()->first()->id,
        'member_id' => mt_rand(1, 2),
    ];
});
