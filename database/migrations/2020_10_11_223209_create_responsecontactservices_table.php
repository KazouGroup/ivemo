<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResponsecontactservicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('responsecontactservices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->string('ip')->nullable();
            $table->boolean('status')->default(true);
            $table->unsignedBigInteger('contactservice_id')->nullable()->index();
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->foreign('contactservice_id')->references('id')->on('contactservices')->onDelete('cascade');
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
        Schema::dropIfExists('responsecontactservices');
    }
}
