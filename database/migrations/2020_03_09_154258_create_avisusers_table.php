<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAvisusersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avisusers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->longText('description')->nullable();
            $table->string('slug')->nullable();
            $table->string('ip')->nullable();
            $table->boolean('status')->default(true);

            $table->timestamps();

            $table->unsignedBigInteger('from_id')->nullable()->index();
            $table->unsignedBigInteger('to_id')->nullable()->index();
            $table->foreign('to_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('avisusers');
    }
}
