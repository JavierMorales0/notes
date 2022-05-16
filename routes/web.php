<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/api/notes', 'NotesController@index');
$router->get('/api/notes/{id}', 'NotesController@show');
$router->post('/api/notes', 'NotesController@store');
$router->put('/api/notes/{id}', 'NotesController@update');
$router->delete('/api/notes/{id}', 'NotesController@destroy');
