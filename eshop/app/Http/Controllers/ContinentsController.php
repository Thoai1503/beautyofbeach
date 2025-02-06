<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Continents;

class ContinentsController extends Controller
{
    //

    public function index()
    {
        $continents= Continents::all();
        return response()->json($continents);
        
    }

    public function store(Request $request)
    {
        // Validate the input data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Create a new continent
        $continent = Continents::create([
            'name' => $validatedData['name'],
        ]);

        // Return the created continent data as JSON
        return response()->json($continent, 201);
    }

    public function show($id)
    {
        $continent = Continents::find($id);

        if (!$continent) {
            return response()->json(['message' => 'Continent not found'], 404);
        }

        return response()->json($continent);
    }
}
