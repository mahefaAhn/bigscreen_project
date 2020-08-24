<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterQaSessionsPublicUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('qa_sessions', function (Blueprint $table) {
            $table->foreignId('public_user_id')
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
            $table->dropForeign('qa_sessions_public_user_id_foreign');

            // Supprimer la colonne
            $table->dropColumn('public_user_id');
        });
    }
}
