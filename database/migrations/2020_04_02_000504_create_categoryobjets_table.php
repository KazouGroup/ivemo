<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCategoryobjetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoryobjets', function (Blueprint $table) {
            $table->id();
            $table->string('label')->nullable();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();
        });

        $categoryobjets = array(
            array('name' => 'Publication d\'annonces immobilières', 'label' => 'Publication d\'annonces immobilières','slug' => str_slug('Publication d\'annonces immobilières')),
            array('name' => 'Publicité sur le site', 'label' => 'Publicité sur le site','slug' => str_slug('Publicité sur le site')),
            array('name' => 'Proposition de collaboration', 'label' => 'Proposition de collaboration','slug' => str_slug('Proposition de collaboration')),
            array('name' => 'Rapport d\'erreurs / problèmes', 'label' => 'Rapport d\'erreurs / problèmes','slug' => str_slug('Rapport d\'erreurs / problèmes')),
            array('name' => 'Rapports d\'escroquerie', 'label' => 'Rapports d\'escroquerie','slug' => str_slug('Rapports d\'escroquerie')),
            array('name' => 'Demande, commentaires, suggestion', 'label' => 'Demande, commentaires, suggestion','slug' => str_slug('Demande, commentaires, suggestion')),
            array('name' => 'Autre (Préciser)', 'label' => 'Autre (Préciser)','slug' => str_slug('Autre')),

        );
        DB::table('categoryobjets')->insert($categoryobjets);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoryobjets');
    }
}
