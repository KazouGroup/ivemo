<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCategoryemploymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoryemployments', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('label')->nullable();
            $table->string('slug')->nullable();
            $table->string('photo')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();

            $table->unsignedBigInteger('user_id')->nullable()->index();
        });

        $categoryemployments = array(
            array('name' => 'Formations & Cours','label' => 'cette Formations & Cours','slug' => str_slug('Formations & Cours'),'status' => true,'user_id' => 1,'photo' => "https://dummyimage.com/wsvga/00bb66/0088ff&text=ipsum"),
            array('name' => 'Services & Prestations','label' => 'ce Services & Prestations','slug' => str_slug('Services & Prestations'),'status' => true,'user_id' => 1,'photo' => "https://dummyimage.com/wsvga/00bb66/0088ff&text=ipsum"),
            array('name' => 'Emplois & Job','label' => 'cette Emplois & Job','slug' => str_slug('Emplois & Job'),'status' => true,'user_id' => 1,'photo' => "https://dummyimage.com/wsvga/00bb66/0088ff&text=ipsum"),

        );
        DB::table('categoryemployments')->insert($categoryemployments);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoryemployments');
    }
}
