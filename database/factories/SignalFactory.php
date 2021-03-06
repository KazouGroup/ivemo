<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Models\signal;
use App\Models\user;
use Faker\Generator as Faker;


$factory->define(signal::class, function (Faker $faker) {

    $servicemodel = collect([
        ['name' => 'App\Models\employment'],
        ['name' => 'App\Models\annoncelocation'],
        ['name' => 'App\Models\annoncevente'],
        ['name' => 'App\Models\forum']
    ]);

    return [
        'user_id' => user::inRandomOrder()->first()->id,
        'signalable_id' => mt_rand(1, 2),
        'signalable_type' => $servicemodel->shuffle()->first()['name'],
        'ip' => $faker->ipv4,
        'subject' => $faker->text(10),
        'message' => $faker->realText(rand(10, 100)),
        'created_at' => $faker->dateTime,
    ];
});

