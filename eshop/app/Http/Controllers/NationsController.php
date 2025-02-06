<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nations;
class NationsController extends Controller
{
    public function index()
    {
        $nation = Nations::all();
        return response()->json($nation);
    }

}
