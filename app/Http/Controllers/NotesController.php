<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isNan;

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
        $results = DB::table('note')->get();
        return response()->json($results);
    }

    // test the auth method
    public function auth()
    {
        return response()->json([
            'message' => 'You are authenticated'
        ]);
    }



    // Get one method
    public function show($id)
    {
        // Verify the id if its a number
        if (!is_numeric($id)) {
            return response()->json([
                'message' => 'The id must be a number'
            ], 400);
        }
        // Execute the query
        $results = DB::table('note')->where('id', $id)->first();
        // Verify if the query returned results
        if ($results == null) {
            return response()->json([
                'message' => 'The note does not exist'
            ], 404);
        }
        // Return the results
        return response()->json($results);
    }

    // Insert method
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'is_important' => ['required', 'boolean'],
            'is_private' => ['required', 'boolean'],
        ]);

        $title = $request->input('title');
        $content = $request->input('content');
        $is_important = $request->input('is_important');
        $is_private = $request->input('is_private');
        $pass = $request->input('pass') ?? '';

        // Insert the note into the database and returning the ID
        $insertedNoteId = DB::table('note')->insertGetId([
            'title' => $title,
            'content' => $content,
            'is_important' => $is_important,
            'is_private' => $is_private,
            'pass' => $pass,
        ]);
        // Get the entire register with the ID
        $note = DB::table('note')->where('id', $insertedNoteId)->first();
        return response()->json($note);
    }

    // Update method
    public function update(Request $request, $id)
    {
        // Verify if the given ID is a number
        if (!is_numeric($id)) {
            return response()->json([
                'message' => 'The ID must be a number'
            ], 400);
        }
        // Validate all the input fields
        $this->validate($request, [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'is_important' => ['required', 'boolean'],
            'is_private' => ['required', 'boolean'],
        ]);
        $title = $request->input('title');
        $content = $request->input('content');
        $is_important = $request->input('is_important');
        $is_private = $request->input('is_private');
        $pass = $request->input('pass') ?? '';
        $results = DB::table('note')->where('id', $id)->update([
            'title' => $title,
            'content' => $content,
            'is_important' => $is_important,
            'is_private' => $is_private,
            'pass' => $pass,
        ]);
        if ($results == 0) {
            return response()->json([
                'message' => 'The note does not exist'
            ], 404);
        }
        return response()->json([
            'message' => 'The note was updated'
        ]);
    }

    // Delete method
    public function destroy($id)
    {
        // Verify if the id is a number
        if (!is_numeric($id)) {
            return response()->json([
                'message' => 'The id is not valid'
            ], 400);
        }
        // Delete the note
        $results = DB::table('note')->where('id', $id)->delete();
        if (!$results) {
            return response()->json([
                'message' => 'Note not found'
            ]);
        }
        // End response
        return response()->json([
            'message' => 'Note deleted'
        ]);
    }
}
