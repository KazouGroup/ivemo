<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAboutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('abouts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('fblink')->nullable();
            $table->string('lkndlink')->nullable();
            $table->string('instlink')->nullable();
            $table->string('photo')->nullable();
            $table->text('description')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status')->default(false)->nullable();
            $table->string('ip')->nullable();
            $table->timestamps();

            //$table->unsignedInteger('user_id')->nullable()->index();
            //$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('abouts');
    }
}
