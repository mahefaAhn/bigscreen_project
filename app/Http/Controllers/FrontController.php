<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FrontController extends Controller
{
    // Index page
    public function index(){
        $data       = [
        ];
        return view('app',$data);
    }
}
