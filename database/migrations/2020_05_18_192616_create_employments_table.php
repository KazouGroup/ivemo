<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmploymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employments', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->string('slugin')->nullable();
            $table->string('district')->nullable();
            $table->string('photo')->nullable();
            $table->unsignedBigInteger('price')->nullable();
            $table->string('ip')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('status_admin')->default(true);
            $table->longText('description')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('city_id')->nullable()->index();
            $table->unsignedBigInteger('member_id')->nullable()->index();

            $table->unsignedBigInteger('categoryemployment_id')->nullable()->index();
            $table->foreign('categoryemployment_id')->references('id')->on('categoryemployments')->onDelete('cascade');

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
        Schema::dropIfExists('employments');
    }
}
