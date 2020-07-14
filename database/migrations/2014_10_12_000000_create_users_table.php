<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username')->unique();
            $table->string('first_name');
            $table->string('slug')->nullable();
            $table->string('last_name')->nullable();
            $table->string('sex')->default('male');
            $table->date('birthday')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('provider')->nullable();
            $table->text('social_token')->nullable();
            $table->string('color_name')->default('primary');
            $table->boolean('status_user')->default(false);
            $table->integer('status_profile')->default('0');
            $table->string('avatar')->nullable();
            $table->string('avatarcover')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
