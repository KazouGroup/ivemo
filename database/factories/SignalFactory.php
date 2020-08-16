<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Model\signal;
use App\Model\user;
use Faker\Generator as Faker;


$factory->define(signal::class, function (Faker $faker) {

    $servicemodel = collect([
        ['name' => 'App\Model\employment'],
        ['name' => 'App\Model\annoncelocation'],
        ['name' => 'App\Model\annoncevente'],
        ['name' => 'App\Model\forum']
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

