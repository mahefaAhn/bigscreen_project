<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
// Import model
use App\Question;
use App\Answer;
use App\User;

class BigscreenController extends Controller
{
    public function showResultPretty($data){
        return response()->json($data,200,[],JSON_PRETTY_PRINT);
    }

    // Function to show question informations
    public function show(int $id){
        $data = Question::find($id);
        return $this->showResultPretty($data);
    }

    // Function to return json list of question
    public function question_list(){
        $data = Question::with(['types','options'])->get();
        return $this->showResultPretty($data);
    }

    // Function to list answer group by id user and datetime
    public function listAnswers(){
        $first_list = Answer::with(['questions','users'])->get()->groupBy('users.id')->toArray();
        $array      = [];
        foreach($first_list as $first){
            array_push($array,$first);
        }
        return $this->showResultPretty($array);
    }

    // Function to save answer
    public function saveForm(Request $request){
        $result         = $request->all();
        $array_result   = [];
        $email_user     = null;
        foreach($result as $id => $value) if($id=='1') $email_user = $value;
        // Check if email is already saved in DB
        $user_exist     = sizeof(User::where('email',$email_user)->pluck('id')->toArray());
        if($user_exist==0){
            User::create(array(
                'name'      => 'new user',
                'email'     => $email_user,
                'password'  => Hash::make($email_user),
                'status'    => 'client'
            ));
        }
        $user_id        = User::where('email',$email_user)->pluck('id')->toArray()[0];
        foreach($result as $id => $value) {
            $answer_insert = Answer::create(array(
                'content'           => $value,
            ));
            $answer_insert->questions()->associate($id);
            $answer_insert->users()->associate($user_id);
            $answer_insert->save();
        }

        // Generate unique link
        $characters         = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength   = strlen($characters);
        $randomString       = $user_id;
        $length             = 10;
        for ($i = 0; $i < $length; $i++) $randomString .= $characters[rand(0, $charactersLength - 1)];

        // Update User by setting the link
        User::where('id',$user_id)->update(['link' => $randomString]);

        return $randomString;
    }

    // Function to get user response by unique link
    public function getUserResponse(String $link){
        $answers        = Answer::with(['questions','questions.options','questions.types','users'])->get()->where('users.link', $link)->toArray();
        $userAnswer     = [];
        foreach($answers as $key => $value){
            array_push($userAnswer, $value);
        }
        return $this->showResultPretty($userAnswer);
    }

    // Function to check if user and password are OK
    public function checkAuthentication(Request $request){
        $result         = $request->all();
        $email          = null;
        $password       = null;
        foreach($result as $id => $value){
            if($id=='email')    $email = $value;
            if($id=='password') $password = $value;
        }
        $data                   = [];
        $data['resultFound']    = 0;
        $data['userFound']      = 0;
        $user   = User::where([['email','=',$email],['status','=','admin']])->first();
        if($user){
            $truePassword   = Hash::check($password, $user->password);
            if($truePassword){
                $data['resultFound']    = 1;
                $data['userFound']      = $user->toArray();
            }
        }   
        return $this->showResultPretty($data);
    }

    // Function to list the users who answered the survey
    public function getUserWhoAnswered(){
        $answers    = Answer::with('users')->get()->groupBy('users.email')->toArray();
        $userMail   = [];
        foreach($answers as $key => $value){
            $mykey = $key;
            array_push($userMail, strtolower($key));
        }
        $result                 = [];
        $result['emailList']    = $userMail;
        return $this->showResultPretty($result);
    }

    //-----------------------------------------------------------------//
    //----------------------------- GRAPH -----------------------------//
    //-----------------------------------------------------------------//
    // Function to get pie chart data
    public function getPieChartData_element($idQuestion){
        /*
        Model
        const data               = [
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        ];
        */
        $questionInfo                   = Question::with(['types','options'])->where('id', $idQuestion)->first();
        $questionData_elt               = [];
        // Reinit color 
        $colorPicker    = ['#003049','#d62828','#f77f00','#fcbf49','#eae2b7','#006d77','#ffb5a7','#78290f','#001f54'];
        // Push title and id
        $questionData_elt['title']              = $questionInfo['title'];
        $questionData_elt['id']                 = $idQuestion;
        $questionData_elt['type']               = 'chart';
        $questionData_elt['data']               = [];
        /* Labels */
        $questionData_elt['data']['labels']     = [];
        /* Datasets */
        $questionData_elt['data']['datasets']   = [];
        $datasetsArray                          = [];
        $datasetsArray['data']                  = [];
        $datasetsArray['backgroundColor']       = [];
        $datasetsArray['hoverBackgroundColor']  = [];
        // Get options
        $temp_choice                = json_decode ($questionInfo['options']['content']);
        foreach($temp_choice as $choice){
            // Get count of each option by idQuestion
            $temp                   = Answer::with(['questions'])->where([['content',$choice],['questions_id',$idQuestion]])->count();
            // Choose color in array
            $tempColor      = $colorPicker[rand(0,(sizeof($colorPicker)-1))];
            // Delete color from colorPicker
            $colorPicker =  array_values(array_diff( $colorPicker, array($tempColor) ));
            // Push all data in final result
            array_push($questionData_elt['data']['labels'], $choice);
            array_push($datasetsArray['data'] , $temp);
            array_push($datasetsArray['backgroundColor'] , $tempColor);
            array_push($datasetsArray['hoverBackgroundColor'] , $tempColor);
        }
        array_push($questionData_elt['data']['datasets'] , $datasetsArray);
        return $questionData_elt;
    }

    // Function to get radar chart data
    public function getRadarChartData_element($idQuestion){
        /*
        Model
        const data               = [
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'My First dataset',
                data: [65, 59, 90, 81, 56, 55, 40],
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
            }]
        ];
        */
        // Get info of question
        $questionInfo                       = Question::with(['types','options'])->where('id', $idQuestion)->first();
        $questionData_elt                   = [];
        $colorPicker                        = ['#003049','#d62828','#f77f00','#fcbf49','#eae2b7','#006d77','#ffb5a7','#78290f','#001f54'];
        // Push title and id
        $questionData_elt['title']                  = $questionInfo['title'];
        $questionData_elt['id']                     = $idQuestion;
        $questionData_elt['type']                   = 'radar';
        $questionData_elt['data']                   = [];
        /* Labels */
        $questionData_elt['data']['labels']         = [];
        /* Datasets */
        $questionData_elt['data']['datasets']       = [];
        $datasetsArray                              = [];
        $datasetsArray['data']                      = [];
        // Get options
        $temp_choice                = json_decode ($questionInfo['options']['content']);
        // Color
        $bgColor                                    = '';
        $ptColor                                    = '#fff';
        foreach($temp_choice as $choice){
            // Get count of each option by idQuestion
            $temp                   = Answer::with(['questions'])->where([['content',$choice],['questions_id',$idQuestion]])->count();
            // Choose color in array
            $bgColor                = $colorPicker[rand(0,(sizeof($colorPicker)-1))];
            // Delete color from colorPicker
            $colorPicker            =  array_values(array_diff( $colorPicker, array($bgColor) ));
            // Push all data in final result
            array_push($questionData_elt['data']['labels'], $choice);
            array_push($datasetsArray['data'] , $temp);
        }
        $datasetsArray['label']                     = 'Réponses enregistrées';
        $datasetsArray['backgroundColor']           = $bgColor;
        $datasetsArray['borderColor']               = $bgColor;
        $datasetsArray['pointBackgroundColor']      = $bgColor;
        $datasetsArray['pointHoverBorderColor']     = $bgColor;
        $datasetsArray['pointBorderColor']          = $ptColor;
        $datasetsArray['pointHoverBackgroundColor'] = $ptColor;
        array_push($questionData_elt['data']['datasets'] , $datasetsArray);
        return $questionData_elt;
    }

    // Function to get chart data
    public function getChartData(Request $request){
        /*
            Model of array
            $data = array(
                array(
                    'idQuestion'    => 5,
                    'typeChart'     => 'radar',
                ),
                array(
                    'idQuestion'    => 6,
                    'typeChart'     => 'pie',
                ),
            );
        */
        $array          = $request->all();
        $resultData     = [];
        foreach($array as $element){
            $itemData   = ($element['typeChart'] == 'radar') ? $this->getRadarChartData_element($element['idQuestion']) : ($element['typeChart'] == 'pie' ? $this->getPieChartData_element($element['idQuestion']) : null);
            array_push($resultData, $itemData);
        }
        return $this->showResultPretty($resultData);
    }

    // Function to get radar chart data // NEW
    public function getRadarChartData(){
        /*
        Model
        const data               = [
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'My First dataset',
                data: [65, 59, 90, 81, 56, 55, 40],
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
            }]
        ];
        */
        // Push title and id
        $questionData_elt                           = [];
        /* Labels */
        $questionData_elt['labels']                 = ['Qualité de l\'image', 'Confort de l\'utilisation', 'Connection réseau', 'Qualité des graphismes', 'Qualité audio'];
        /* Datasets */
        $questionData_elt['datasets']               = [];
        $questionData_elt['datasets']['data']       = [];
        /* Get count of user who answered survey */
        $userWhoAnswered                            = User::whereNotNull('link')->count();
        if($userWhoAnswered == 0) $userWhoAnswered  = 1;
        /* Questions */
        $questions                                  = [11,12,13,14,15];
        foreach($questions as $idQuestion){
            // Get info of question
            $questionInfo                           = Question::with(['types','options'])->where('id', $idQuestion)->first();
            $colorPicker                            = ['#003049','#d62828','#f77f00','#fcbf49','#eae2b7','#006d77','#ffb5a7','#78290f','#001f54'];
            
            // Get options
            $choices                                = json_decode ($questionInfo['options']['content']);
            // Color
            $bgColor                                = '';
            $ptColor                                = '#fff';
            // Count before AVG
            $sum                                     =   0;
            foreach($choices as $choice){
                // Get count of each option by idQuestion
                $temp                   = Answer::with(['questions'])->where([['content',$choice],['questions_id',$idQuestion]])->count();
                $choice_int             = (int) $choice;
                $sum                    += $choice_int*$temp;
            }
            $countAverage               = round($sum / $userWhoAnswered, 2);
            array_push($questionData_elt['datasets']['data'] , $countAverage);
            $bgColor                    = $colorPicker[rand(0,(sizeof($colorPicker)-1))];
        }

        $questionData_elt['datasets']['label']                     = 'Réponses enregistrées';
        $questionData_elt['datasets']['backgroundColor']           = $bgColor;
        $questionData_elt['datasets']['borderColor']               = $bgColor;
        $questionData_elt['datasets']['pointBackgroundColor']      = $bgColor;
        $questionData_elt['datasets']['pointHoverBorderColor']     = $bgColor;
        $questionData_elt['datasets']['pointBorderColor']          = $ptColor;
        $questionData_elt['datasets']['pointHoverBackgroundColor'] = $ptColor;
        return $this->showResultPretty($questionData_elt);
    }
}
