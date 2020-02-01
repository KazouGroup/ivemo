<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;


class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cities') -> delete();
        $faker = Faker::create();
        $photo = $faker->imageUrl($width = 1000, $height = 900);
        $slug = sha1(date('YmdHis') . str_random(30));
        $cities = array(
            array('photo' => $photo ,'slug' => str_slug('Abong-Mbang'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Abong-Mbang'),
            array('photo' => $photo ,'slug' => str_slug('Akonolinga'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Akonolinga'),
            array('photo' => $photo ,'slug' => str_slug('Bafang'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Bafang'),
            array('photo' => $photo ,'slug' => str_slug('Bafia'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Bafia'),
            array('photo' => $photo ,'slug' => str_slug('Bali'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Bali'),
            array('photo' => $photo ,'slug' => str_slug('Bamenda'), 'status' => true, 'city_vip' => true, 'name' => 'Bamenda'),
            array('photo' => $photo ,'slug' => str_slug('Bafoussam'), 'status' => true, 'city_vip' => true, 'name' => 'Bafoussam'),
            array('photo' => $photo ,'slug' => str_slug('Baganté'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Baganté'),
            array('photo' => $photo ,'slug' => str_slug('Batibo'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Batibo'),
            array('photo' => $photo ,'slug' => str_slug('Banyo'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Banyo'),
            array('photo' => $photo ,'slug' => str_slug('Batouri'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Batouri'),
            array('photo' => $photo ,'slug' => str_slug('Bélabo'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Bélabo'),
            array('photo' => $photo ,'slug' => str_slug('Bertoua'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Bertoua'),
            array('photo' => $photo ,'slug' => str_slug('Blangoua'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Blangoua'),
            array('photo' => $photo ,'slug' => str_slug('Boyo'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Boyo'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Buea'),
            array('photo' => $photo ,'slug' => str_slug('Douala'), 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Douala'),
            array('photo' => $photo ,'slug' => str_slug('Dschang'), 'status' => true, 'city_vip' => true, 'name' => 'Dschang'),
            array('photo' => $photo ,'slug' => str_slug('Ebolowa'), 'status' => true, 'city_vip' => false, 'name' => 'Ebolowa'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Edea'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Eseka'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Figuil'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Fontem'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Foumban'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Foumbot'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Fundong'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Garoua'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Garoua-boulai'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Gazawa'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Guider'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Guidiguis'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Kaéle'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Kekem'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Kousseri'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Koutaba'),
            array('photo' => $photo ,'slug' => str_slug('Kribi'), 'status' => true, 'city_vip' => true, 'name' => 'Kribi'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Kumba'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Kumbo'),
            array('photo' => $photo ,'slug' => str_slug('Limbé'), 'status' => true, 'city_vip' => true, 'name' => 'Limbé'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Loum'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Magda'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Makenene'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Maga'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Mamfe'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Manjo'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Mbalmayo'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'MBandjock'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Mbanga'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Meiganga'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Mbouda'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Melong'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Mokolo'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Mora'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Muyuka'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Nanga-Eboko'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Ndop'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Ngaoundal'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Ngaoundére'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Nkambe'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Nkongsamba'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Nkoteng'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Obala'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Pitoa'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Sangmelima'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Tibati'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Tcholiré'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Tiko'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Tombel'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Tonga'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Touboro'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Wum'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Yabassi'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Yagoua'),
            array('photo' => $photo ,'slug' => str_slug('Yaounde'), 'status' => true, 'city_vip' => true, 'name' => 'Yaounde'),
            array('photo' => $photo ,'slug' => $slug, 'status' => $faker->boolean, 'city_vip' => false, 'name' => 'Yokadouma'),
        );
        DB::table('cities')->insert($cities);
    }
}
