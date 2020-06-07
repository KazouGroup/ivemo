<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactusersadvertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contactusersadverts', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->string('appointment_time')->nullable();
            $table->string('email',200)->nullable();
            $table->string('phone',100)->nullable();
            $table->string('ip')->nullable();
            $table->boolean('status')->nullable();
            $table->boolean('confirm_send')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contactusersadverts');
    }
}
