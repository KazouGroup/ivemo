<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnoncelocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annoncelocations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->nullable();
            $table->longText('description')->nullable();
            $table->string('slug')->nullable();
            $table->integer('surface')->nullable();
            $table->integer('rooms')->nullable();
            $table->integer('pieces')->nullable();
            $table->decimal('price', 15,2)->nullable();
            $table->decimal('award_price', 15,2)->nullable();
            $table->date('disponible_date')->nullable();
            $table->boolean('status')->nullable()->default(true);
            $table->timestamps();
            $table->unsignedBigInteger('photo_id')->nullable()->index();
            $table->unsignedBigInteger('city_id')->nullable()->index();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('categoryannoncelocation_id')->nullable()->index();
            $table->foreign('categoryannoncelocation_id')->references('id')->on('categoryannoncelocations')->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annoncelocations');
    }
}
