<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\abonne\subscribeforum;
use App\Model\abonne\subscribemployment;
use App\Model\employment;
use App\Model\followeruser;
use App\Model\user;
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
