<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkwithusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workwithuses', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->string('photo')->nullable();
            $table->boolean('status')->default(false);
            $table->string('ip')->nullable();
            $table->longText('description')->nullable();
            $table->timestamps();


            $table->unsignedBigInteger('city_id')->nullable()->index();

            $table->unsignedBigInteger('categoryworkwithus_id')->nullable()->index();
            $table->foreign('categoryworkwithus_id')->references('id')->on('categoryworkwithuses')->onDelete('cascade');

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workwithuses');
    }
}
