<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            $table->boolean('furniture')->after('status')->default(false)->nullable();
            $table->boolean('terrace')->after('status')->default(false)->nullable();
            $table->boolean('balcony')->after('status')->default(false)->nullable();
            $table->boolean('elevator')->after('status')->default(false)->nullable();
            $table->text('link_video')->after('title')->nullable();
            $table->string('phone_seller')->after('link_video')->nullable();
            $table->unsignedBigInteger('terrace_number')->after('link_video')->nullable();
            $table->unsignedBigInteger('balcony_number')->after('link_video')->nullable();
            $table->string('contact_seller')->after('link_video')->nullable();
            $table->unsignedBigInteger('periodeannonce_id')->after('user_id')->nullable()->index();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('annoncereservations', function (Blueprint $table) {
            $table->boolean('furniture')->after('status')->default(false)->nullable();
            $table->boolean('terrace')->after('status')->default(false)->nullable();
            $table->boolean('balcony')->after('status')->default(false)->nullable();
            $table->boolean('elevator')->after('status')->default(false)->nullable();
            $table->text('link_video')->after('title')->nullable();
            $table->string('phone_seller')->after('link_video')->nullable();
            $table->unsignedBigInteger('terrace_number')->after('link_video')->nullable();
            $table->unsignedBigInteger('balcony_number')->after('link_video')->nullable();
            $table->string('contact_seller')->after('link_video')->nullable();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('annonceventes', function (Blueprint $table) {
            $table->boolean('furniture')->after('status')->default(false)->nullable();
            $table->boolean('terrace')->after('status')->default(false)->nullable();
            $table->boolean('balcony')->after('status')->default(false)->nullable();
            $table->boolean('elevator')->after('status')->default(false)->nullable();
            $table->text('link_video')->after('title')->nullable();
            $table->string('phone_seller')->after('link_video')->nullable();
            $table->unsignedBigInteger('terrace_number')->after('link_video')->nullable();
            $table->unsignedBigInteger('balcony_number')->after('link_video')->nullable();
            $table->string('contact_seller')->after('link_video')->nullable();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('forums', function (Blueprint $table) {
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        Schema::table('employments', function (Blueprint $table) {
            $table->text('link_video')->after('title')->nullable();
            $table->timestamp('expired_at')->default(now()->addDays(7))->after('created_at');
        });

        $periodeannonces = array(
            array('name' => 'le mois','slug' => str_slug('le mois'),'status' => true),
        );
        DB::table('periodeannonces')->insert($periodeannonces);
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
