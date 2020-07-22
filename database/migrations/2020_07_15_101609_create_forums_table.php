<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forums', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('ip')->nullable();
            $table->string('slug')->nullable();
            $table->string('slugin')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('status_admin')->default(true);
            $table->boolean('status_comments')->default(true);
            $table->longText('description')->nullable();
            $table->timestamps();


            $table->unsignedBigInteger('categoryforum_id')->nullable()->index();
            $table->foreign('categoryforum_id')->references('id')->on('categoryforums')->onDelete('cascade');

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
        Schema::dropIfExists('forums');
    }
}
