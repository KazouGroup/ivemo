<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCategoryworkwithusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoryworkwithuses', function (Blueprint $table) {
            $table->id();
            $table->string('label')->nullable();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();
        });

        $categoryworkwithuses = array(
            array('name' => 'Technologie', 'label' => 'Technologie','slug' => str_slug('Technologie')),
            array('name' => 'Ventes internes', 'label' => 'Ventes internes','slug' => str_slug('Ventes internes')),
            array('name' => 'Marketing', 'label' => 'Marketing','slug' => str_slug('Marketing')),
            array('name' => 'Administration', 'label' => 'Administration','slug' => str_slug('Administration')),
            array('name' => 'Ventes', 'label' => 'Ventes','slug' => str_slug('ventes')),

        );
        DB::table('categoryworkwithuses')->insert($categoryworkwithuses);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoryworkwithuses');
    }
}
