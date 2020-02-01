<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateAnnoncetypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annoncetypes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->timestamps();
        });

        Schema::table('annoncelocations', function (Blueprint $table) {

            $table->unsignedBigInteger('annoncetype_id')->nullable()->index();
            $table->foreign('annoncetype_id')->references('id')->on('annoncetypes')->onUpdate('restrict');
        });



    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annoncetypes');
        Schema::dropIfExists('annoncelocations');
    }
}
