<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\annoncelocation;
use App\Model\contactuserslocation;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(contactuserslocation::class, function (Faker $faker) {
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
        'annoncelocation_id' => annoncelocation::inRandomOrder()->first()->id,
    ];
});