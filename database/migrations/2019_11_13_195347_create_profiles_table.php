<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('facebook_link')->nullable();
            $table->string('twitter_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('site_internet')->nullable();
            $table->string('linkedin_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->boolean('status_avis')->default(true);
            $table->boolean('status_team_user')->default(true);
            $table->unsignedBigInteger('birthdate')->nullable();
            $table->string('address')->nullable();
            $table->string('full_name')->nullable();
            $table->string('slug')->nullable();
            $table->longText('description')->nullable();
            $table->timestamps();

            $table->boolean('status_annonce_locations')->default(true);
            $table->boolean('status_annonce_reservations')->default(true);
            $table->boolean('status_annonce_ventes')->default(true);

            $table->boolean('status_blog_locations')->default(true);
            $table->boolean('status_blog_reservations')->default(true);
            $table->boolean('status_blog_ventes')->default(true);

            $table->unsignedBigInteger('city_id')->nullable()->index();
            $table->unsignedBigInteger('categoryprofile_id')->nullable()->index();

            $table->unsignedBigInteger('user_id')->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
