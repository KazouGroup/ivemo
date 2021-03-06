<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('audits', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->nullableMorphs('owner');

            $table->uuid('user_id')->nullable();
            $table->string('user_type')->nullable();

            $table->string('event');

            $table->uuid('auditable_id');
            $table->string('auditable_type');

            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();

            $table->text('url')->nullable();
            $table->ipAddress('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->text('tags')->nullable();
            $table->timestamps();


            $table->index(['user_id', 'user_type']);
            $table->index(['auditable_id', 'auditable_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('audits');
    }
}
