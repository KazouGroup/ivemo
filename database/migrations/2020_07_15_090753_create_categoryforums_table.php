<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCategoryforumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoryforums', function (Blueprint $table) {
            $table->id();
            $table->string('label')->nullable();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->string('photo')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();

            $table->unsignedBigInteger('user_id')->nullable()->index();
        });

        $categoryforums = array(
            array('name' => 'Vente & achat immobilier', 'label' => 'Vente & achat immobilier','slug' => str_slug('Technologie'),'status' => true, 'photo' => "https://dummyimage.com/wsvga/00bb66/0088ff&text=ipsum"),
            array('name' => 'Ventes internes', 'label' => 'Ventes internes','slug' => str_slug('Ventes internes'),'status' => true, 'photo' => "https://dummyimage.com/wsvga/00bb66/0088ff&text=ipsum"),
            array('name' => 'Marketing', 'label' => 'Marketing','slug' => str_slug('Marketing'),'status' => false, 'photo' => "https://dummyimage.com/wsvga/00bb66/0088ff&text=ipsum"),
            array('name' => 'Administration', 'label' => 'Administration','slug' => str_slug('Administration'),'status' => true, 'photo' => "https://dummyimage.com/wsvga/00bb66/0088ff&text=ipsum"),
            array('name' => 'Ventes', 'label' => 'Ventes','slug' => str_slug('ventes'),'status' => true, 'photo' => "https://dummyimage.com/wsvga/00bb66/0088ff&text=ipsum"),

        );
        DB::table('categoryforums')->insert($categoryforums);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoryforums');
    }
}
