<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\avisuser;
use App\Models\responseavisuser;
use App\Models\user;
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
