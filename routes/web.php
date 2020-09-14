<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* 
    Expression :
    'all' => '.*',
    'alpha' => '[A-Za-z]+',
    'alphanum' => '[A-Za-z0-9]+',
    'alphadash' => '[-A-Za-z0-9_-]+',
    'num' => '[0-9]+',
*/

// Questions
Route::get('questions', 'APIController@question_list')->name('question_list');
Route::get('question/{id}', 'APIController@show')->where(['id' => '[0-9]+']);

// Answer
Route::get('answer_id/{content}', 'APIController@answer_id')->where(['content' => '[a-z]+']);
Route::get('listAnswers','APIController@listAnswers')->name('listAnswers');
Route::get('userResponse/{link}', 'APIController@getUserResponse')->where(['link' => '[A-Za-z0-9]+']);

// Admin
Route::get('admin', 'BackController@index')->name('admin');
Route::get('admin/login', 'BackController@login')->name('adminLogin');
Route::get('admin/questions', 'BackController@questionList')->name('questions');
Route::get('admin/answers', 'BackController@answerList')->name('answers');
Route::get('admin/pieChartData', 'APIController@getPieChartData')->name('pieChartData');
Route::get('admin/radarChartData', 'APIController@getRadarChartData')->name('radarChartData');
Route::get('userWhoAnswered', 'APIController@getUserWhoAnswered')->name('userWhoAnswered');

// Authentication
Route::post('authentication', 'APIController@checkAuthentication')->name('authentication');

Route::post('saveForm', 'APIController@saveForm');

//Route::view('/{path?}', 'app')->where('path', '.');
Route::view('/{path?}', 'app');
Auth::routes();