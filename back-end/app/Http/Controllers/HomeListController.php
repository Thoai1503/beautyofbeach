<?php

namespace App\Http\Controllers;
use App\Models\Beaches;
use Illuminate\Http\Request;

class HomeListController extends Controller
{
    public function index_Home()
    {
        $beaches = Beaches::take(4)->get();
        return response()->json($beaches);
    }
}
