<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactuserslocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contactuserslocations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('full_name')->nullable();
            $table->string('email',200)->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status_archvement')->default(false);
            $table->boolean('status_favorite')->default(false);
            $table->boolean('status_red')->default(true);
            $table->string('phone',100)->nullable();
            $table->string('ip')->nullable();
            $table->boolean('confirm_send')->nullable();
            $table->mediumText('subject')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->unsignedBigInteger('from_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('from_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('annoncelocation_id')->nullable()->index();
            $table->foreign('annoncelocation_id')->references('id')->on('annoncelocations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contactuserslocations');
    }
}
