<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');                               // Primary key
            $table->string('title');                                // Title
            $table->enum('category',['A','B','C'])->default('B');   // Category
            /*
                A. Un choix parmis plusieurs proposition
                B. Un champ de saisie de 255 caractères maximum
                C. Un choix numérique (1 à 5)
            */
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
