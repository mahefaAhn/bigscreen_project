<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name'          => 'Admin',
                'email'         => 'admin@bigscreen.com',
                'password'      => Hash::make( 'Admin123!' ),
                'status'        => 'admin'
            ],
            [
                'name'          => 'Mahefa AHN',
                'email'         => 'mahefa.ahn@gmail.com',
                'password'      => Hash::make( 'mahefa' ),
                'status'        => 'client'
            ],
            [
                'name'          => 'Sample User',
                'email'         => 'sample.user@localhost.admin',
                'password'      => Hash::make( 'sample' ),
                'status'        => 'client'
            ],
        ]);

        $this->call(QASeeder::class);
    }
}