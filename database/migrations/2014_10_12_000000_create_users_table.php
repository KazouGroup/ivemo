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
            $table->string('url_site')->nullable();
            $table->string('address')->nullable();
            $table->string('last_name')->nullable();
            $table->string('sex')->default('Male');
            $table->date('birthday')->nullable();
            $table->string('color_name')->default('primary');
            $table->boolean('status_user')->nullable();
            $table->string('avatar')->nullable()->default('https://www.kazoucoin.com/assets/img/default-avatar.png');
            $table->string('avatarcover')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->longText('description')->nullable();
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
