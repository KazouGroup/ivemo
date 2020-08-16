<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Model\comment;
use App\Model\user;
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

$factory->define(comment::class, function (Faker $faker) {

    $servicemodel = collect([
        ['name' => 'App\Model\employment'],
        ['name' => 'App\Model\blogannoncelocation'],
        ['name' => 'App\Model\blogannoncereservation'],
        ['name' => 'App\Model\blogannoncevente'],
        ['name' => 'App\Model\annoncelocation'],
        ['name' => 'App\Model\annoncereservation'],
        ['name' => 'App\Model\annoncevente'],
        ['name' => 'App\Model\forum']
    ]);

    return [
        'user_id' => user::inRandomOrder()->first()->id,
        'commentable_id' => mt_rand(1, 2),
        'commentable_type' => $servicemodel->shuffle()->first()['name'],
        'body' => $faker->realText(rand(10, 200)),
        'created_at' => $faker->dateTime,
    ];
});
