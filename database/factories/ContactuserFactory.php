<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\contactuser;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(contactuser::class, function (Faker $faker) {
    $myslug = sha1(('YmdHis') . str_random(30));
    return [
        'full_name' => $faker->firstNameMale,
        'slug' => str_slug($myslug),
        'email' => $faker->freeEmail,
        'status_red' => $faker->boolean,
        'subject' => $faker->text(50),
        'message' => $faker->paragraph,
        'user_id' => user::inRandomOrder()->first()->id,
        'annoncereservation_id' => annoncereservation::inRandomOrder()->first()->id,
        'annoncelocation_id' => annoncelocation::inRandomOrder()->first()->id,
        'annoncevente_id' => annoncevente::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
