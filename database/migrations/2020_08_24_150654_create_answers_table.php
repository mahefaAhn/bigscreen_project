<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->increments('id');                                    
            $table->longText('content');                                                            // Answer of user
            $table->timestamps();                                                                   // Timestamps
            // Foreign key : Relation with Question 
            $table->unsignedInteger('questions_id')->nullable();
            $table->foreign('questions_id')->references('id')->on('questions')->onDelete('SET NULL');
            // Foreign key : Relation with User 
            $table->unsignedInteger('users_id')->nullable();
            $table->foreign('users_id')->references('id')->on('users')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answers');
    }
}
