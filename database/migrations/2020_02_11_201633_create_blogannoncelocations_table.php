<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogannoncelocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogannoncelocations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->nullable();
            $table->string('photo')->nullable();
            $table->integer('red_time')->nullable();
            $table->longText('description')->nullable();
            $table->string('slug')->nullable();
            $table->string('slugin')->nullable();
            $table->boolean('status')->nullable()->default(true);
            $table->timestamps();

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('categoryannoncelocation_id')->nullable()->index();
            $table->foreign('categoryannoncelocation_id')->references('id')->on('categoryannoncelocations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogannoncelocations');
    }
}
