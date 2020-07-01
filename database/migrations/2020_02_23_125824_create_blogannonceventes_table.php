<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogannonceventesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogannonceventes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->nullable();
            $table->string('photo')->nullable();
            $table->string('ip')->nullable();
            $table->integer('red_time')->nullable();
            $table->longText('description')->nullable();
            $table->string('slug')->nullable();
            $table->string('slugin')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('status_comments')->default(false);
            $table->boolean('status_admin')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedBigInteger('member_id')->nullable()->index();

            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('categoryannoncevente_id')->nullable()->index();
            $table->foreign('categoryannoncevente_id')->references('id')->on('categoryannonceventes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogannonceventes');
    }
}
