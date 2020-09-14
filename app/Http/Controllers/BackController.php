<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BackController extends Controller
{
    // Index page
    public function index(){
        $data       = [
            "active"    => "indexPage"
        ];
        return view('back.standart',$data);
    }
    
    // Login page
    public function login(){
        $data       = [
        ];
        return view('back.login',$data);
    }

    // Question list
    public function questionList(){
        $data       = [
            "active"    => "questionList"
        ];
        return view('back.standart',$data);
    }

    // Answer list
    public function answerList(){
        $data       = [
            "active"    => "answerList"
        ];
        return view('back.standart',$data);
    }
}
