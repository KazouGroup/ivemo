<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Model\annoncereservation;
use App\Model\categoryannoncereservation;
use App\Model\city;
use App\Model\user;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(annoncereservation::class, function (Faker $faker) {
    $title = $faker->sentence(9);
    $disponible_date = $faker->dateTimeBetween('-2 years','+10 years');
    return [
        'title' => $title,
        'district' => $faker->city,
        'status' => true,
        'price' => $faker->randomNumber(5),
        'surface' => $faker->randomNumber(2),
        'rooms' => $faker->randomDigitNot(3),
        'pieces' => $faker->randomDigitNot(3),
        'status_wifi' => $faker->boolean,
        'status_car_sharing' => $faker->boolean,
        'status_parking' => $faker->boolean,
        'status_lunch' => $faker->boolean,
        'status_consiegerie' => $faker->boolean,
        'dry_cleaning' => $faker->dry_cleaning,
        //'status_admin' => $faker->boolean,
        'description' => "<p>".$faker->realText(rand(1000, 2000))."</p>",
        'promo_price' => $faker->randomNumber(6),
        'disponible_date' => $disponible_date,
        'annoncetype_id' => 3,
        'slug' => str_slug($title),
        'slugin' => Str::uuid(),

        'categoryannoncereservation_id' => categoryannoncereservation::inRandomOrder()->first()->id,
        'city_id' => city::where(['status' => 1])->inRandomOrder()->first()->id,
        'user_id' => user::inRandomOrder()->first()->id,
        'created_at' => $faker->dateTime,
    ];
});
