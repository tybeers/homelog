<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('singlepage');
});

Route::post('/auth/login', 'AuthController@login');
Route::get('/auth/logout', 'AuthController@logout');

Route::any('/servicetypes','ServiceController@getServiceTypes');
Route::post('/servicetypes/add','ServiceController@addServiceType');
Route::post('/servicetypes/delete','ServiceController@delServiceType');

Route::any('/services','ServiceController@getServices');
Route::post('/services/add','ServiceController@addService');

Route::any('/providers','ProviderController@getProviders');
Route::post('/providers/add','ProviderController@addProvider');

Route::any('/ratings','ProviderController@getRatings');
