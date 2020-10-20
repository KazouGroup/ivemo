<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInfoToContactservicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contactservices', function (Blueprint $table) {
            $table->string('district')->nullable();
            $table->date('start_reservation')->nullable();
            $table->date('end_reservation')->nullable();
            $table->unsignedBigInteger('adult_number')->nullable();
            $table->unsignedBigInteger('children_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contactservices', function (Blueprint $table) {
            //
        });
    }
}
