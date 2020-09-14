<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInfoToMyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('annoncelocations', function (Blueprint $table) {
            $table->boolean('furniture')->default(false)->after('status');
            $table->boolean('terrace')->default(false)->after('status');
            $table->boolean('balcony')->default(false)->after('status');
            $table->boolean('elevator')->default(false)->after('status');
        });

        Schema::table('annoncereservations', function (Blueprint $table) {
            $table->boolean('furniture')->default(false)->after('status');
            $table->boolean('terrace')->default(false)->after('status');
            $table->boolean('balcony')->default(false)->after('status');
            $table->boolean('elevator')->default(false)->after('status');
        });

        Schema::table('annonceventes', function (Blueprint $table) {
            $table->boolean('furniture')->default(false)->after('status');
            $table->boolean('terrace')->default(false)->after('status');
            $table->boolean('balcony')->default(false)->after('status');
            $table->boolean('elevator')->default(false)->after('status');
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
