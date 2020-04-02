<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactusersfaqsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contactusersfaqs', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('ip')->nullable();
            $table->string('full_name')->nullable();
            $table->boolean('status')->default(false);
            $table->longText('message')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('categoryuser_id')->nullable()->index();
            $table->foreign('categoryuser_id')->references('id')->on('categoryusers')->onDelete('cascade');

            $table->unsignedBigInteger('categoryobjet_id')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contactusersfaqs');
    }
}
