<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\contactuseremployment;
use App\Model\employment;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(contactuseremployment::class, function (Faker $faker) {
    $myslug = sha1(('YmdHis') . str_random(30));
    return [
        'full_name' => $faker->firstNameMale,
        'slug' => str_slug($myslug),
        'email' => $faker->email,
        'status_red' => $faker->boolean,
        'status_archvement' => $faker->boolean,
        'status_favorite' => $faker->boolean,
        'user_id' => user::inRandomOrder()->first()->id,
        'employment_id' => employment::inRandomOrder()->first()->id,
        'subject' => $faker->text(50),
        'message' => $faker->realText(rand(1000, 5000)),
        'created_at' => $faker->dateTime,
    ];
});
