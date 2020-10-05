<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\contactservice;
use App\Models\employment;
use App\Models\user;
use Faker\Generator as Faker;

$factory->define(contactservice::class, function (Faker $faker) {
    $myslug = sha1(('YmdHis') . str_random(30));

    $servicemodel = collect([
        ['name' => 'App\Model\employment'],
        ['name' => 'App\Model\annoncelocation'],
        ['name' => 'App\Model\annoncevente'],
        ['name' => 'App\Model\workwithuses']
    ]);

    return [
        'full_name' => $faker->firstNameMale,
        'slug' => str_slug($myslug),
        'email' => $faker->email,
        'status_red' => $faker->boolean,
        'status_archvement' => $faker->boolean,
        'status_favorite' => $faker->boolean,
        'from_id' => user::inRandomOrder()->first()->id,
        'to_id' => user::inRandomOrder()->first()->id,
        'contactserviceable_id' => mt_rand(1, 2),
        'contactserviceable_type' => $servicemodel->shuffle()->first()['name'],
        'subject' => $faker->text(50),
        'message' => $faker->realText(rand(1000, 5000)),
        'created_at' => $faker->dateTime,
    ];
});
