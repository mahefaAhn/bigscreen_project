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
            $table->increments('id');                                                                       // Primary key
            $table->string('title');                                                                        // Title
            $table->enum('input_type',['text','textarea','numberSelect','textSelect'])->default('text');    // TypeInput
            $table->timestamps();
            // Foreign key : Relation with Types 
            $table->unsignedInteger('types_id')->nullable();
            $table->foreign('types_id')->references('id')->on('types')->onDelete('SET NULL');
            // Foreign key : Relation with Options 
            $table->unsignedInteger('options_id')->nullable();
            $table->foreign('options_id')->references('id')->on('options')->onDelete('SET NULL');
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
