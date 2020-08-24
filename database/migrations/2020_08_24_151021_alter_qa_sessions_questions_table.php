<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterQaSessionsQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('qa_sessions', function (Blueprint $table) {
            $table->foreignId('question_id')
                ->constrained()
                ->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('qa_sessions', function (Blueprint $table) {
            //Supprimer la contrainte
            $table->dropForeign('qa_sessions_question_id_foreign');

            // Supprimer la colonne
            $table->dropColumn('question_id');
        });
    }
}
