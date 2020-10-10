<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Models\comment;
use App\Models\like;
use App\Models\uploadimage;
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

$factory->define(uploadimage::class, function (Faker $faker) {

    $backgroundColor = trim($faker->safeHexcolor, '#');
    $foregroundColor = trim($faker->safeHexcolor, '#');

    $servicemodel = collect([
        ['name' => 'App\Models\activitycity'],
        ['name' => 'App\Models\annoncelocation'],
        ['name' => 'App\Models\annoncereservation'],
        ['name' => 'App\Models\annoncevente'],
    ]);

    return [
        'status' => $faker->boolean,
        'uploadimagealable_id' => mt_rand(1, 500),
        'uploadimagealable_type' => $servicemodel->shuffle()->first()['name'],
        'photo' => "https://dummyimage.com/wsvga/" . $backgroundColor . "/". $foregroundColor ."&text=" . $faker->word,
        'created_at' => $faker->dateTime,
    ];
});
