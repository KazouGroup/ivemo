<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactuseremploymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contactuseremployments', function (Blueprint $table) {
            $table->id();
            $table->string('full_name',250)->nullable();
            $table->string('subject',250)->nullable();
            $table->string('phone',100)->nullable();
            $table->string('slug')->nullable();
            $table->string('ip')->nullable();
            $table->string('email')->nullable();
            $table->boolean('status_archvement')->default(false);
            $table->boolean('status_favorite')->default(false);
            $table->boolean('status_red')->default(false);
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('employment_id')->nullable()->index();
            $table->foreign('employment_id')->references('id')->on('employments')->onDelete('cascade');

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->unsignedBigInteger('from_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('from_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contactuseremployments');
    }
}
