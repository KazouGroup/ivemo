<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignalblogannoncelocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('signalblogannoncelocations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->string('subject')->nullable();
            $table->string('email')->nullable();
            $table->string('ip')->nullable();
            $table->boolean('confirm_send')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('blogannoncelocation_id')->nullable()->index();
            $table->foreign('blogannoncelocation_id')->references('id')->on('blogannoncelocations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('signalblogannoncelocations');
    }
}
