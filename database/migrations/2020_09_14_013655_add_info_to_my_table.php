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
            $table->string('phone_seller')->after('link_video')->nullable();
            $table->integer('terrace_number')->after('link_video')->default("1");
            $table->integer('balcony_number')->after('link_video')->default("1");
            $table->string('contact_seller')->after('link_video')->nullable();

        });

        Schema::table('annoncereservations', function (Blueprint $table) {
            $table->boolean('furniture')->default(false)->after('status');
            $table->boolean('terrace')->default(false)->after('status');
            $table->boolean('balcony')->default(false)->after('status');
            $table->boolean('elevator')->default(false)->after('status');
            $table->string('phone_seller')->after('link_video')->nullable();
            $table->integer('terrace_number')->after('link_video')->default("1");
            $table->integer('balcony_number')->after('link_video')->default("1");
            $table->string('contact_seller')->after('link_video')->nullable();

        });

        Schema::table('annonceventes', function (Blueprint $table) {
            $table->boolean('furniture')->default(false)->after('status');
            $table->boolean('terrace')->default(false)->after('status');
            $table->boolean('balcony')->default(false)->after('status');
            $table->boolean('elevator')->default(false)->after('status');
            $table->string('phone_seller')->after('link_video')->nullable();
            $table->integer('terrace_number')->after('link_video')->default("1");
            $table->integer('balcony_number')->after('link_video')->default("1");
            $table->string('contact_seller')->after('link_video')->nullable();

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
