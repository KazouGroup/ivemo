<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactusersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contactusers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('full_name')->nullable();
            $table->string('email')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status_red')->default(false);
            $table->string('phone')->nullable();
            $table->string('ip')->nullable();
            $table->string('subject')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('annoncevente_id')->nullable()->index();
            $table->foreign('annoncevente_id')->references('id')->on('annonceventes')->onDelete('cascade');

            $table->unsignedBigInteger('annoncereservation_id')->nullable()->index();
            $table->foreign('annoncereservation_id')->references('id')->on('annoncereservations')->onDelete('cascade');

            $table->unsignedBigInteger('annoncelocation_id')->nullable()->index();
            $table->foreign('annoncelocation_id')->references('id')->on('annoncelocations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contactuser');
    }
}
