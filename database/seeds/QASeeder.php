<?php

use Illuminate\Database\Seeder;
use App\Question;
use App\Option;
use App\Answer;
use App\Type;

class QASeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert into Type
        Type::insert([
            ['name'     => 'A'],
            ['name'     => 'B'],
            ['name'     => 'C']
        ]);

        // Insert into options
        Option::insert([
            [
                'label'     => 'oui_non',
                'content'   => json_encode(["Oui","Non"])
            ],
            [
                'label'     => 'sexe',
                'content'   => json_encode([
                    "Homme",
                    "Femme",
                    "Préfère ne pas répondre"
                ])
            ],
            [
                'label'     => 'marque_casque_vr',
                'content'   => json_encode([
                    "Occulus Rifts/s",
                    "HTC Vive",
                    "Windows Mixed Reality",
                    "PSVR"
                ])
            ],
            [
                'label'     => 'magasin_application',
                'content'   => json_encode([
                    "SteamVR",
                    "Occulus store",
                    "Playstation VR",
                    "Google Play",
                    "Windows store"
                ])
            ],
            [
                'label'     => 'casque_prochain_achat',
                'content'   => json_encode([
                    "SteamVR",
                    "Occulus Quest",
                    "Occulus Go",
                    "HTC Vive Pro",
                    "Autre",
                    "Aucun"
                ])
            ],
            [
                'label'     => 'utilisation_big_screen',
                'content'   => json_encode([
                    "regarder des émissions TV en direct",
                    "regarder des films",
                    "jouer en solo",
                    "jouer en team"
                ])
            ],
        ]);

        DB::table('questions')->delete();
        // Insert into question
        $jsonFile   = File::get("database/data/firstInput.json");
        $data       = json_decode($jsonFile);
        foreach($data as $obj){
            $question_insert = Question::create(array(
                "title"     => $obj->title,
                "input_type"=> $obj->input_type,
            ));
            $thisCategory = Type::where('name',$obj->category)->pluck('id')->first();
            $question_insert->types()->associate($thisCategory);
            if(is_array($obj->answers)){
                //Convert array to string
                $toArray        = json_encode($obj->answers);
                $resultString   = "";
                $sizeOfResult   = sizeof($obj->answers);
                $countResult    = 1;
                foreach($obj->answers as $answer){
                    $attach        = ($countResult!=$sizeOfResult) ? "," : "";
                    $resultString .= $answer.$attach;
                    $countResult++;
                }
                $resultString   = "[".$resultString."]";

                // Check if option is saved in DB
                $optionExist    = Option::where('content',$resultString)->pluck('id')->first();
                if($optionExist==null){
                    Option::create(array(
                        "label"       => 'new_option',
                        "content"     => $toArray,
                    ));
                }
                $idThisOption   = Option::where('content',$resultString)->pluck('id')->first();
                // Associate question with option
                $question_insert->options()->associate($idThisOption);
            }
            $question_insert->save();
        }

        /*
        // Insert into option
        App\Option::insert([
            [
                'content'     => 'Oui',
            ],
            [
                'content'     => 'Non',
            ],
            [
                'content'     => '1',
            ],
            [
                'content'     => '2',
            ],
            [
                'content'     => '3',
            ],
            [
                'content'     => '4',
            ],
            [
                'content'     => '5',
            ],
            [
                'content'     => 'Homme',
            ],
            [
                'content'     => 'Femme',
            ],
            [
                'content'     => 'Ne préfère pas répondre',
            ],
            [
                'content'     => 'Occulus Rift/s',
            ],
            [
                'content'     => 'HTC Vive',
            ],
            [
                'content'     => 'Windows Mixed Reality',
            ],
            [
                'content'     => 'PSVR',
            ],
            [
                'content'     => 'SteamVR',
            ],
            [
                'content'     => 'Occulus store',
            ],
            [
                'content'     => 'Viveport',
            ],
            [
                'content'     => 'Playstation VR',
            ],
            [
                'content'     => 'Google Play',
            ],
            [
                'content'     => 'Windows store',
            ],
            [
                'content'     => 'Occulus Quest',
            ],
            [
                'content'     => 'Occulus Go',
            ],
            [
                'content'     => 'HTC Vive Pro',
            ],
            [
                'content'     => 'Autre',
            ],
            [
                'content'     => 'Aucun',
            ],
            [
                'content'     => 'regarder des émissions TV en direct',
            ],
            [
                'content'     => 'regarder des films',
            ],
            [
                'content'     => 'jouer en solo',
            ],
            [
                'content'     => 'jouer en team',
            ]
        ]);

        // Insert into answer
        App\Answer::insert([
            // Question 3 
            [
                'question_id'   => '3',
                'option_id'     => '8'
            ],
            [
                'question_id'   => '3',
                'option_id'     => '9'
            ],
            [
                'question_id'   => '3',
                'option_id'     => '10'
            ],
            // Question 6
            [
                'question_id'   => '6',
                'option_id'     => '11'
            ],
            [
                'question_id'   => '6',
                'option_id'     => '12'
            ],
            [
                'question_id'   => '6',
                'option_id'     => '13'
            ],
            [
                'question_id'   => '6',
                'option_id'     => '14'
            ],
            // Question 7
            [
                'question_id'   => '7',
                'option_id'     => '15'
            ],
            [
                'question_id'   => '7',
                'option_id'     => '16'
            ],
            [
                'question_id'   => '7',
                'option_id'     => '17'
            ],
            [
                'question_id'   => '7',
                'option_id'     => '18'
            ],
            [
                'question_id'   => '7',
                'option_id'     => '19'
            ],
            [
                'question_id'   => '7',
                'option_id'     => '20'
            ],
            // Question 8
            [
                'question_id'   => '8',
                'option_id'     => '21'
            ],
            [
                'question_id'   => '8',
                'option_id'     => '22'
            ],
            [
                'question_id'   => '8',
                'option_id'     => '23'
            ],
            [
                'question_id'   => '8',
                'option_id'     => '24'
            ],
            [
                'question_id'   => '8',
                'option_id'     => '25'
            ],
            // Question 10
            [
                'question_id'   => '10',
                'option_id'     => '26'
            ],
            [
                'question_id'   => '10',
                'option_id'     => '27'
            ],
            [
                'question_id'   => '10',
                'option_id'     => '28'
            ],
            [
                'question_id'   => '10',
                'option_id'     => '29'
            ],
            // Question 16
            [
                'question_id'   => '16',
                'option_id'     => '1'
            ],
            [
                'question_id'   => '16',
                'option_id'     => '2'
            ],
            // Question 17
            [
                'question_id'   => '17',
                'option_id'     => '1'
            ],
            [
                'question_id'   => '17',
                'option_id'     => '2'
            ]
        ]);
        */

    }
}
