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
        $cities = array(
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Abong-Mbang'), 'status' => false, 'city_vip' => false, 'name' => 'Abong-Mbang'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Akonolinga'), 'status' => false, 'city_vip' => false, 'name' => 'Akonolinga'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Bafang'), 'status' => false, 'city_vip' => false, 'name' => 'Bafang'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Bafia'), 'status' => false, 'city_vip' => false, 'name' => 'Bafia'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Bali'), 'status' => false, 'city_vip' => false, 'name' => 'Bali'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Bamenda'), 'status' => true, 'city_vip' => true, 'name' => 'Bamenda'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Bafoussam'), 'status' => true, 'city_vip' => true, 'name' => 'Bafoussam'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Baganté'), 'status' => false, 'city_vip' => false, 'name' => 'Baganté'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Batibo'), 'status' => false, 'city_vip' => false, 'name' => 'Batibo'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Banyo'), 'status' => false, 'city_vip' => false, 'name' => 'Banyo'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Batouri'), 'status' => false, 'city_vip' => false, 'name' => 'Batouri'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Bélabo'), 'status' => false, 'city_vip' => false, 'name' => 'Bélabo'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Bertoua'), 'status' => false, 'city_vip' => false, 'name' => 'Bertoua'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Blangoua'), 'status' => false, 'city_vip' => false, 'name' => 'Blangoua'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Boyo'), 'status' => false, 'city_vip' => false, 'name' => 'Boyo'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Buea'), 'status' => false, 'city_vip' => false, 'name' => 'Buea'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Douala'), 'status' => true, 'city_vip' => false, 'name' => 'Douala'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Dschang'), 'status' => true, 'city_vip' => true, 'name' => 'Dschang'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Ebolowa'), 'status' => true, 'city_vip' => false, 'name' => 'Ebolowa'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Edea'), 'status' => false, 'city_vip' => false, 'name' => 'Edea'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('eseka'), 'status' => false, 'city_vip' => false, 'name' => 'Eseka'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Figuil'), 'status' => false, 'city_vip' => false, 'name' => 'Figuil'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Fontem'), 'status' => false, 'city_vip' => false, 'name' => 'Fontem'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Foumban'), 'status' => false, 'city_vip' => false, 'name' => 'Foumban'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Foumbot'), 'status' => false, 'city_vip' => false, 'name' => 'Foumbot'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Fundong'), 'status' => false, 'city_vip' => false, 'name' => 'Fundong'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Garoua'), 'status' => false, 'city_vip' => false, 'name' => 'Garoua'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Garoua-boulai'), 'status' => false, 'city_vip' => false, 'name' => 'Garoua-boulai'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Gazawa'), 'status' => false, 'city_vip' => false, 'name' => 'Gazawa'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Guider'), 'status' => false, 'city_vip' => false, 'name' => 'Guider'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('guidiguis'), 'status' => false, 'city_vip' => false, 'name' => 'Guidiguis'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('kaele'), 'status' => false, 'city_vip' => false, 'name' => 'Kaéle'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('kekem'), 'status' => false, 'city_vip' => false, 'name' => 'Kekem'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('kousserie'), 'status' => false, 'city_vip' => false, 'name' => 'Kousseri'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('koutaba'), 'status' => false, 'city_vip' => false, 'name' => 'Koutaba'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Kribi'), 'status' => true, 'city_vip' => true, 'name' => 'Kribi'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('kumba'), 'status' => false, 'city_vip' => false, 'name' => 'Kumba'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('kumbo'), 'status' => false, 'city_vip' => false, 'name' => 'Kumbo'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Limbé'), 'status' => true, 'city_vip' => true, 'name' => 'Limbé'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Loum'), 'status' => false, 'city_vip' => false, 'name' => 'Loum'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Magda'), 'status' => false, 'city_vip' => false, 'name' => 'Magda'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Makenene'), 'status' => false, 'city_vip' => false, 'name' => 'Makenene'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Maga'), 'status' => false, 'city_vip' => false, 'name' => 'Maga'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Mamfe'), 'status' => false, 'city_vip' => false, 'name' => 'Mamfe'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Manjo'), 'status' => false, 'city_vip' => false, 'name' => 'Manjo'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Mbalmayo'), 'status' => false, 'city_vip' => false, 'name' => 'Mbalmayo'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Mbandjock'), 'status' => false, 'city_vip' => false, 'name' => 'MBandjock'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Mbanga'), 'status' => false, 'city_vip' => false, 'name' => 'Mbanga'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Meiganga'), 'status' => false, 'city_vip' => false, 'name' => 'Meiganga'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Mbouda'), 'status' => false, 'city_vip' => false, 'name' => 'Mbouda'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Melong'), 'status' => false, 'city_vip' => false, 'name' => 'Melong'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Mokolo'), 'status' => false, 'city_vip' => false, 'name' => 'Mokolo'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Mora'), 'status' => false, 'city_vip' => false, 'name' => 'Mora'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Muyuka'), 'status' => false, 'city_vip' => false, 'name' => 'Muyuka'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Nanga-eboko'), 'status' => false, 'city_vip' => false, 'name' => 'Nanga-Eboko'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Ndop'), 'status' => false, 'city_vip' => false, 'name' => 'Ndop'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('ngaoundal'), 'status' => false, 'city_vip' => false, 'name' => 'Ngaoundal'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('ngaoundere'), 'status' => false, 'city_vip' => false, 'name' => 'Ngaoundére'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('nkambe'), 'status' => false, 'city_vip' => false, 'name' => 'Nkambe'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Nkonsamba'), 'status' => false, 'city_vip' => false, 'name' => 'Nkongsamba'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('nkoteng'), 'status' => false, 'city_vip' => false, 'name' => 'Nkoteng'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('obala'), 'status' => false, 'city_vip' => false, 'name' => 'Obala'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('pitoa'), 'status' => false, 'city_vip' => false, 'name' => 'Pitoa'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Sangmelima'), 'status' => false, 'city_vip' => false, 'name' => 'Sangmelima'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('tibati'), 'status' => false, 'city_vip' => false, 'name' => 'Tibati'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('tcholire'), 'status' => false, 'city_vip' => false, 'name' => 'Tcholiré'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('tiko'), 'status' => false, 'city_vip' => false, 'name' => 'Tiko'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('tombel'), 'status' => false, 'city_vip' => false, 'name' => 'Tombel'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('tonga'), 'status' => false, 'city_vip' => false, 'name' => 'Tonga'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('touboro'), 'status' => false, 'city_vip' => false, 'name' => 'Touboro'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('wum'), 'status' => false, 'city_vip' => false, 'name' => 'Wum'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('yabassi'), 'status' => false, 'city_vip' => false, 'name' => 'Yabassi'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Yagoua'), 'status' => false, 'city_vip' => false, 'name' => 'Yagoua'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('Yaounde'), 'status' => true, 'city_vip' => true, 'name' => 'Yaounde'),
            array('photo' => $faker->imageUrl($width = 1000, $height = 900) ,'slug' => str_slug('yokadouma'), 'status' => false, 'city_vip' => false, 'name' => 'Yokadouma'),
        );
        DB::table('cities')->insert($cities);
    }
}
