<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

class NotesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    // Index method
    public function index()
    {
        // Connect de Database
        $results = DB::select('SELECT * FROM note');
        return response()->json($results);
    }

    //
}
