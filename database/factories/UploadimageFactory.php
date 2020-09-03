<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Model\comment;
use App\Model\like;
use App\Model\uploadimage;
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

$factory->define(uploadimage::class, function (Faker $faker) {

    $backgroundColor = trim($faker->safeHexcolor, '#');
    $foregroundColor = trim($faker->safeHexcolor, '#');

    $servicemodel = collect([
        ['name' => 'App\Model\activitycity'],
        ['name' => 'App\Model\annoncelocation'],
        ['name' => 'App\Model\annoncereservation'],
        ['name' => 'App\Model\annoncevente'],
    ]);

    return [
        'status' => $faker->boolean,
        'uploadimagealable_id' => mt_rand(1, 500),
        'uploadimagealable_type' => $servicemodel->shuffle()->first()['name'],
        'photo' => "https://dummyimage.com/wsvga/" . $backgroundColor . "/". $foregroundColor ."&text=" . $faker->word,
        'created_at' => $faker->dateTime,
    ];
});
