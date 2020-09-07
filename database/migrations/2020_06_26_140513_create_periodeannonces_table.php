<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreatePeriodeannoncesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('periodeannonces', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();
        });

        $periodeannonces = array(
            array('name' => 'la journée','slug' => str_slug('la journée'),'status' => true),
            array('name' => 'la nuit','slug' => str_slug('la nuit'),'status' => true),
            array('name' => 'la semaine','slug' => str_slug('la semaine'),'status' => true),
            array('name' => 'le weekend', 'slug' => str_slug('le weekend'),'status' => true),

        );
        DB::table('periodeannonces')->insert($periodeannonces);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('periodeannonces');
    }
}
