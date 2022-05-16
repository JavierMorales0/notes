<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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

    // Get all method
    public function index()
    {
        // Connect de Database
        $results = DB::select('SELECT * FROM note');
        return response()->json($results);
    }



    // Get one method
    public function show($id)
    {
        // Connect de Database
        $results = DB::select('SELECT * FROM note WHERE id = ?', [$id]);
        return response()->json($results);
    }

    // Insert method
    public function store(Request $request)
    {
        $title = $request->input('title');
        $content = $request->input('content');
        $is_important = $request->input('is_important');
        $is_private = $request->input('is_private');
        $pass = $request->input('pass') ?? '';

        $results = DB::insert("INSERT INTO note (title, content, is_important, is_private, pass) VALUES (?, ?, ?, ?, ?) RETURNING *", [$title, $content, $is_important, $is_private, $pass]);
        return response()->json($results);
    }

    // Update method
    public function update(Request $request, $id)
    {
        $title = $request->input('title');
        $content = $request->input('content');
        $is_important = $request->input('is_important');
        $is_private = $request->input('is_private');
        $pass = $request->input('pass') ?? '';
        $results = DB::update("UPDATE note SET title = ?, content = ?, is_important = ?, is_private = ?, pass = ? WHERE id = ?", [$title, $content, $is_important, $is_private, $pass, $id]);
        return response()->json($results);
    }

    // Delete method
    public function destroy($id)
    {
        $results = DB::delete("DELETE FROM note WHERE id = ?", [$id]);
        return response()->json($results);
    }
}
