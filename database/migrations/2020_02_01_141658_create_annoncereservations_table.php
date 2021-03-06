<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnoncereservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annoncereservations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->string('ip')->nullable();
            $table->string('slugin')->nullable();
            $table->string('district')->nullable();
            $table->integer('surface')->nullable();
            $table->integer('rooms')->nullable();
            $table->integer('pieces')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('status_comments')->default(true);
            $table->boolean('status_admin')->default(true);
            $table->boolean('status_wifi')->default(false);
            $table->boolean('status_parking')->default(false);
            $table->boolean('status_car_sharing')->default(false);
            $table->boolean('dry_cleaning')->default(false);
            $table->boolean('status_lunch')->default(false);
            $table->boolean('status_consiegerie')->default(false);
            $table->longText('description')->nullable();
            $table->unsignedBigInteger('price')->nullable();
            $table->unsignedBigInteger('promo_price')->nullable();
            $table->date('disponible_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedBigInteger('city_id')->nullable()->index();
            $table->unsignedBigInteger('periodeannonce_id')->nullable()->index();
            $table->unsignedBigInteger('member_id')->nullable()->index();

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('annoncetype_id')->nullable()->index();
            $table->foreign('annoncetype_id')->references('id')->on('annoncetypes')->onUpdate('restrict');

            $table->unsignedBigInteger('categoryannoncereservation_id')->nullable()->index();
            $table->foreign('categoryannoncereservation_id')->references('id')->on('categoryannoncereservations')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annoncereservations');
    }
}
