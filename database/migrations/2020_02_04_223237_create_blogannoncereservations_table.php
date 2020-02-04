<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogannoncereservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogannoncereservations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->nullable();
            $table->string('photo')->nullable();
            $table->longText('description')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status')->nullable()->default(true);
            $table->timestamps();

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('categoryannoncereservation_id')->nullable()->index();
            $table->foreign('categoryannoncereservation_id')->references('id')->on('categoryannoncereservations')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogannoncereservations');
    }
}
