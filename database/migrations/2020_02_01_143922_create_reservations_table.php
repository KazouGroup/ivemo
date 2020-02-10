<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('full_name')->nullable();
            $table->date('start_reservation')->nullable();
            $table->date('end_reservation')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('status')->default(false);
            $table->string('email')->nullable();
            $table->unsignedBigInteger('adult_number')->nullable();
            $table->unsignedBigInteger('children_number')->nullable();
            $table->longText('description')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('annoncereservation_id')->nullable()->index();
            $table->foreign('annoncereservation_id')->references('id')->on('annoncereservations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
