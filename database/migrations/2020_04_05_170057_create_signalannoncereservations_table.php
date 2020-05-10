<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignalannoncereservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('signalannoncereservations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->string('object')->nullable();
            $table->string('email')->nullable();
            $table->string('ip')->nullable();
            $table->boolean('confirm_send')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();

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
        Schema::dropIfExists('signalannoncereservations');
    }
}
