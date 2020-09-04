<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('activitycities', function (Blueprint $table) {
            $table->text('link_video')->after('title')->nullable();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('annoncelocations', function (Blueprint $table) {
            $table->text('link_video')->after('title')->nullable();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('annoncereservations', function (Blueprint $table) {
            $table->text('link_video')->after('title')->nullable();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('annonceventes', function (Blueprint $table) {
            $table->text('link_video')->after('title')->nullable();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('forums', function (Blueprint $table) {
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('employments', function (Blueprint $table) {
            $table->text('link_video')->after('title')->nullable();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activitycities');
        Schema::dropIfExists('forums');
        Schema::dropIfExists('employments');
        Schema::dropIfExists('annoncelocations');
        Schema::dropIfExists('annoncereservations');
        Schema::dropIfExists('annonceventes');
    }
}
