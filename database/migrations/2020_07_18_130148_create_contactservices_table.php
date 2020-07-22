<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactservicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contactservices', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->string('email')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status_red')->default(false);
            $table->string('phone')->nullable();
            $table->string('cv_file')->nullable();
            $table->boolean('status_archvement')->default(false);
            $table->boolean('status_favorite')->default(false);
            $table->string('ip')->nullable();
            $table->boolean('confirm_send')->nullable();
            $table->mediumText('subject')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->string('contactserviceable_type')->nullable();
            $table->unsignedBigInteger('contactserviceable_id')->nullable();

            $table->unsignedBigInteger('from_id')->nullable()->index();
            $table->foreign('from_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('to_id')->nullable()->index();
            $table->foreign('to_id')->references('id')->on('users')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contactservices');
    }
}
