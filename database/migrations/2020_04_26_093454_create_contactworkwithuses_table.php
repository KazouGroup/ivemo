<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactworkwithusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contactworkwithuses', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->string('email')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status_red')->default(false);
            $table->string('phone')->nullable();
            $table->string('cv_file')->nullable();
            $table->string('ip')->nullable();
            $table->boolean('confirm_send')->nullable();
            $table->mediumText('subject')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('workwithus_id')->nullable()->index();
            $table->foreign('workwithus_id')->references('id')->on('workwithuses')->onDelete('cascade');

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->unsignedBigInteger('from_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('from_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contactworkwithuses');
    }
}
