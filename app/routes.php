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
Route::post('/servicetypes/edit','ServiceController@editServiceType');
Route::post('/servicetypes/delete','ServiceController@delServiceType');

Route::any('/services','ServiceController@getServices');
Route::post('/services/add','ServiceController@addService');

Route::any('/providers','ProviderController@getProviders');
Route::post('/providers/add','ProviderController@addProvider');
Route::post('/providers/edit','ProviderController@editProvider');

Route::any('/ratings','ProviderController@getRatings');

Route::any('/medicines','MedicineController@getMedicines');
Route::post('/medicines/add','MedicineController@addMedicine');
Route::post('/medicines/edit','MedicineController@editMedicine');

Route::post('/journal/get','DayController@getDays');
Route::any('/journal/available','FoodController@getFoods');
Route::post('/journal/addEating','DayController@addEating');
Route::post('/journal/addCategory','FoodController@addCategory');
Route::post('/journal/addFood','FoodController@addFood');
Route::post('/journal/delEating','DayController@delEating');