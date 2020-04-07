<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignalannonceventesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('signalannonceventes', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->string('object')->nullable();
            $table->string('email')->nullable();
            $table->string('ip')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('annoncevente_id')->nullable()->index();
            $table->foreign('annoncevente_id')->references('id')->on('annonceventes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('signalannonceventes');
    }
}
