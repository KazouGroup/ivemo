<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCategoryusersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoryusers', function (Blueprint $table) {
            $table->id();
            $table->string('label')->nullable();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();

        });

        $categoryusers = array(
            array('name' => 'Agence immobilière', 'label' => 'Agence immobilière','slug' => str_slug('Agence immobilière')),
            array('name' => 'Entreprise de construction', 'label' => 'Entreprise de construction','slug' => str_slug('Entreprise de construction')),
            array('name' => 'Journaliste', 'label' => 'Journaliste','slug' => str_slug('Journaliste')),
            array('name' => 'Privé', 'label' => 'Privé','slug' => str_slug('Privé')),
            array('name' => 'Autre (Préciser)', 'label' => 'Autre','slug' => str_slug('Autre')),

        );
        DB::table('categoryusers')->insert($categoryusers);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoryusers');
    }
}
