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

// Front Office
Route::get('answer_id/{content}', 'BigscreenController@answer_id')->where(['content' => '[a-z]+']);
Route::get('userResponse/{link}', 'BigscreenController@getUserResponse')->where(['link' => '[A-Za-z0-9]+']);
Route::post('saveForm', 'BigscreenController@saveForm');
Route::get('questions', 'BigscreenController@question_list')->name('question_list');
Route::get('question/{id}', 'BigscreenController@show')->where(['id' => '[0-9]+']);

// Back Office
Route::get('userWhoAnswered', 'BigscreenController@getUserWhoAnswered')->name('userWhoAnswered');
Route::post('admin/chartData', 'BigscreenController@getChartData')->name('chartData');
Route::get('admin/getRadarChartData', 'BigscreenController@getRadarChartData')->name('getRadarChartData');
Route::get('listAnswers','BigscreenController@listAnswers')->name('listAnswers');
Route::post('authentication', 'BigscreenController@checkAuthentication')->name('authentication');

Route::view('/{path?}', 'app')->where('path', '.*');
Auth::routes();