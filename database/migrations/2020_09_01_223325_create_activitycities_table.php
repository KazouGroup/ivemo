<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivitycitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activitycities', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->string('slugin')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('status_comments')->default(false);
            $table->boolean('status_link_contact')->default(false);
            $table->longText('description')->nullable();
            $table->string('ip')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('city_id')->nullable()->index();
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->unsignedBigInteger('member_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('member_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activitycities');
    }
}
