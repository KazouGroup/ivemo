<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Models\comment;
use App\Models\like;
use App\Models\user;
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

$factory->define(like::class, function (Faker $faker) {

    $servicemodel = collect([
        ['name' => 'App\Models\employment'],
        ['name' => 'App\Models\blogannoncelocation'],
        ['name' => 'App\Models\blogannoncereservation'],
        ['name' => 'App\Models\blogannoncevente'],
        ['name' => 'App\Models\annoncelocation'],
        ['name' => 'App\Models\annoncereservation'],
        ['name' => 'App\Models\annoncevente'],
        ['name' => 'App\Models\forum'],
        ['name' => 'App\Models\comment']
    ]);

    return [
        'user_id' => user::inRandomOrder()->first()->id,
        'likeable_id' => mt_rand(1, 2),
        'likeable_type' => $servicemodel->shuffle()->first()['name'],
        'created_at' => $faker->dateTime,
    ];
});
