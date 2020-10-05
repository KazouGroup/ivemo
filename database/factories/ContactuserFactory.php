<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\annoncelocation;
use App\Models\annoncereservation;
use App\Models\annoncevente;
use App\Models\contactuser;
use App\Models\user;
use Faker\Generator as Faker;

$factory->define(contactuser::class, function (Faker $faker) {
    $myslug = sha1(('YmdHis') . str_random(30));
    return [
        'full_name' => $faker->firstNameMale,
        'slug' => str_slug($myslug),
        'email' => $faker->freeEmail,
        'status_red' => $faker->boolean,
        'status_archvement' => $faker->boolean,
        'status_favorite' => $faker->boolean,
        'subject' => $faker->text(50),
        'message' => $faker->realText(rand(1000, 4000)),
        'user_id' => user::inRandomOrder()->first()->id,
        //'created_at' => $faker->dateTime,
    ];
});
