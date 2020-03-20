<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\annoncevente;
use App\Model\contactusersvente;
use App\Model\user;
use Faker\Generator as Faker;

$factory->define(contactusersvente::class, function (Faker $faker) {
    $myslug = sha1(('YmdHis') . str_random(30));
    return [
        'full_name' => $faker->firstNameMale,
        'slug' => str_slug($myslug),
        'email' => $faker->freeEmail,
        'status_red' => $faker->boolean,
        'subject' => $faker->text(50),
        'message' => $faker->realText(rand(1000, 4000)),
        'user_id' => user::inRandomOrder()->first()->id,
        'annoncevente_id' => annoncevente::inRandomOrder()->first()->id,
    ];
});
