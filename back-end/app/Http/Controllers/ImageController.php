<?php

namespace App\Http\Controllers;

use App\Models\Reviews;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    //
 
    public function uploader (Request $request) {
      
    if($request->hasFile('image')){

        $image = $request->file('image');
        $name= time().'.'.$image->getClientOriginalExtension();
        $image->move(public_path('image'), $name);
        $imageUrl = url('image/'.$name);
 
        Reviews::create(
            [ 'beachid' => $request->input('beachid'),
            'accountid' => $request->input('accountid'),
            'image_name' => $imageUrl,
            'comment' => $request->input('comment'), 
            ]
        );

        $imageUrl = url('image/'.$name);

        return response()->json([$image]);
        
    }
    return response()->json('please try agian')
        ;
   
    }
    
    public function findByBeachId($beachid)
    {
        $reviews = Reviews::where('beachid', $beachid)->get();
        return response()->json($reviews);
    }

}
