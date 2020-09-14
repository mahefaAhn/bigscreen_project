<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('types', function (Blueprint $table) {
            $table->increments('id');                                  // Primary key
            $table->string('name');                                    // Name
            $table->timestamps();
            /*
                A. Un choix parmis plusieurs proposition
                B. Un champ de saisie de 255 caractères maximum
                C. Un choix numérique (1 à 5)
            */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('types');
    }
}
