<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInfoToProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('profile', function (Blueprint $table) {
            $table->boolean('status_annonce_locations')->default(true);
            $table->boolean('status_annonce_reservations')->default(true);
            $table->boolean('status_annonce_ventes')->default(true);

            $table->boolean('status_blog_locations')->default(true);
            $table->boolean('status_blog_reservations')->default(true);
            $table->boolean('status_blog_ventes')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('profile', function (Blueprint $table) {
            //
        });
    }
}
