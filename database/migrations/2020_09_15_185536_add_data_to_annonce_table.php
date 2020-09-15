<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDataToAnnonceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('annoncelocations', function (Blueprint $table) {


            $table->boolean('furniture')->after('status')->default(false)->nullable();
            $table->boolean('terrace')->after('status')->default(false)->nullable();
            $table->boolean('balcony')->after('status')->default(false)->nullable();
            $table->boolean('elevator')->after('status')->default(false)->nullable();
            $table->unsignedBigInteger('terrace_number')->after('link_video')->nullable();
            $table->unsignedBigInteger('balcony_number')->after('link_video')->nullable();
        });

        Schema::table('annoncereservations', function (Blueprint $table) {


            $table->boolean('furniture')->after('status')->default(false)->nullable();
            $table->boolean('terrace')->after('status')->default(false)->nullable();
            $table->boolean('balcony')->after('status')->default(false)->nullable();
            $table->boolean('elevator')->after('status')->default(false)->nullable();
            $table->unsignedBigInteger('terrace_number')->after('link_video')->nullable();
            $table->unsignedBigInteger('balcony_number')->after('link_video')->nullable();
        });

        Schema::table('annonceventes', function (Blueprint $table) {

            $table->boolean('furniture')->after('status')->default(false)->nullable();
            $table->boolean('terrace')->after('status')->default(false)->nullable();
            $table->boolean('balcony')->after('status')->default(false)->nullable();
            $table->boolean('elevator')->after('status')->default(false)->nullable();
            $table->unsignedBigInteger('terrace_number')->after('link_video')->nullable();
            $table->unsignedBigInteger('balcony_number')->after('link_video')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annoncelocations');
        Schema::dropIfExists('annoncereservations');
        Schema::dropIfExists('annonceventes');
    }
}
