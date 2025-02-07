<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use DB;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    //
    public function store(Request $request) 
    {
        $validateData = $request->validate([
            'beachid'=>'required|string',
            'accountid'=>'required|integer',
            'comment'=>'required|string'
        ]);
    
        $comment= Comments::create([
            'beachid'=> $validateData['beachid'],
            'accountid'=>$validateData['accountid'],
            'comment'=>$validateData['comment']
        ]);

        return response()->json($comment,201);

    }

    public function findByBeachId($beachid)
    {

        $result= DB::table('comments')
        ->join('users','comments.accountid','users.id')
        ->select('comments.beachid as beachid','comments.accountid','comments.comment','name')
        ->where('beachid','=',$beachid)
        ->get();

       // $comments = Comments::where('beachid', $beachid)->get();

        // if ($result->isEmpty()) {
        //     return response()->json(['message' => 'No comments found for this beach']);
        // }

        return response()->json($result);
    }
}
