<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\avisuser;
use App\Model\responseavisuser;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(responseavisuser::class, function (Faker $faker) {
    return [
        'ip' => $faker->ipv4,
        'description' => $faker->realText(rand(200, 300)),
        'avisuser_id' => avisuser::inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
        'created_at' => $faker->dateTime,
    ];
});
