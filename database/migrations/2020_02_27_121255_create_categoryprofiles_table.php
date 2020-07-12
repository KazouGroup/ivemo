<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCategoryprofilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoryprofiles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('label')->nullable();
            $table->string('name')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();
        });

        $categoryprofiles = array(
            array('name' => 'Je souhaite acheter', 'label' => 'Je souhaite acheter'),
            array('name' => 'Je souhaite louer', 'label' => 'Je souhaite louer'),
            array('name' => 'Je souhaite reserver', 'label' => 'Je souhaite reserver'),
            array('name' => 'Je souhaite reserver, acheter et/ ou louer', 'label' => 'Je souhaite reserver, acheter et/ ou louer'),
            array('name' => 'Je suis un professionel', 'label' => 'Je suis un professionel'),
            array('name' => 'Autre', 'label' => 'Autre'),

        );
        DB::table('categoryprofiles')->insert($categoryprofiles);



        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('categoryprofile_id')->nullable()->index();
            $table->foreign('categoryprofile_id')->references('id')->on('categoryprofiles')->onUpdate('restrict');
        });



    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('categoryprofiles');

    }
}
