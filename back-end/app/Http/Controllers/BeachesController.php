<?php

namespace App\Http\Controllers;

use App\Http\Resources\BeachesResource;
use App\Http\Resources\BeachResource;
use App\Models\Continents;
use App\Models\Nations;
use Illuminate\Console\View\Components\Success;
use Illuminate\Http\Request;
use App\Models\Beaches;
use App\Models\Image_libraries;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class BeachesController extends Controller
{

    public function store(Request $request) 
    {
        $validateData = $request->validate([
                    'name'=>'required|string',
            'description'=>'nullable|string',
            'visitor'=>'nullable|string',
            'nationid'=>'required|string',
            'ratingScore'=>'nullable|string',
            'avartar_url'=>'nullable|string'
        ]);
    
        $beach= Beaches::create([
            'name'=> $validateData['name'],
            'description'=>$validateData['description'] ??'',
            'visitor'=>$validateData['visitor']??'',
            'nationid'=>$validateData['nationid'],
            'ratingScore'=>$validateData['ratingScore'] ??'',
            'avartar_url'=>$validateData['avartar_url'] ??''
        ]);
 
    return response()->json($beach,201);
    }
    
    
    public function beach_by_nation_id($nationid)
    {
        $beaches = Beaches::where('nationid', $nationid)->get();

        if ($beaches->isEmpty()) {
            return response()->json(['message' => 'No beaches found for this nation'], 404);
        }

        return response()->json($beaches);
    }
  
    public function showRe($id)
    {
        $singlebeach = Beaches::find($id)->count();
        echo($singlebeach);
        // if (!$singlebeach) {
        //     return response()->json([
        //         'message' => 'Beach not found'
        //     ], 404);
        // }

        // return new BeachesResource($singlebeach);
    }
   public function limit($id){
          $data = Beaches::limit($id)->get();
    dd($data);

          return new BeachesResource($data);
   }
   public function noParamTest(){
     $data= Beaches::all()->countBy(function ($beach){
        return $beach->ratingScore>=4;
     });
     dd($data);
  
   }
  
    public function continent_filter($continent)
    {
         

        $continentfilterd = DB::table('nations')
                    ->join('beaches', 'beaches.nationid', '=', 'nations.id')
                    ->join('continents', 'continents.id', '=', 'nations.continentid')
                    ->select('beaches.*', 'nations.name as nation_name','continents.name as continent_name')
                    ->where('continents.name', $continent)
                    ->get();

        return response()->json($continentfilterd);
    }

    
    public function beachjoin()
    {
         

        $result = DB::table('nations')
                    ->join('beaches', 'beaches.nationid', '=', 'nations.id')
                    ->join('continents', 'continents.id', '=', 'nations.continentid')
                    ->select('beaches.*', 'nations.name as nation_name','continents.name as continent_name')
        
                    ->get();

        return response()->json($result);
    }

    public function multi_filter($nation,$min,$max,$rating)
    {

        $result=DB::table('nations')
        ->join('beaches', 'beaches.nationid', '=', 'nations.id')
        ->join('continents', 'continents.id', '=', 'nations.continentid')
        ->select('beaches.*', 'nations.name as nation_name','continents.name as continent_name')
        ->where('nations.name',$nation)
        ->where('beaches.ratingScore','>=',$rating)
        ->whereBetween('beaches.visitor',[$min,$max])
        ->get();

        return response()->json($result);
    }



    public function index()
    {
        $beach= Beaches::all();
        return response()->json($beach);
        
    }

    public function allToPaginate(){
        $beaches = Beaches::paginate(9);
        return response()->json($beaches);
    }
   
    // public function show_library($id) 
    // {
    // $imgs= Image_libraries::where('beachid',$id)->get();
    // return response()->json($imgs);
    // }
    
    // public function continent_index() {
    //     $continent = Continents::all();
    //     return response()->json($continent);
    // }
    
    public function show($id)
    {
        // Find the product based on id
        $singlebeach = Beaches::find($id);
        

        // Check if the product does not exist
        if (!$singlebeach) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        // Return the product data as JSON
        return response()->json($singlebeach);
    }
    public function test_multi_filter()
    {
        $continent = Continents::factory()->create(['name' => 'Asia']);
        $nation = Nations::factory()->create(['continentid' => $continent->id, 'name' => 'Japan']);
        Beaches::factory()->create(['nationid' => $nation->id, 'name' => 'Beach 1', 'ratingScore' => 4.5, 'visitor' => 500]);

        $response = $this->getJson('/api/beaches/filter/Japan/100/1000/4.5');

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'Beach 1']);
    }
public function update(Request $request, $id)
{
    // Find the beach by ID
    $beach = Beaches::find($id);

    // Check if the beach does not exist
    if (!$beach) {
        return response()->json(['message' => 'Beach not found'], 404);
    }

    // Validate the input data
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'visitor' => 'nullable|string',
        'nationid' => 'required|string',
        'ratingScore' => 'nullable|string',
        'avartar_url' => 'nullable|string'
    ]);

    // Update the beach data
    $beach->update([
        'name' => $validatedData['name'],
        'description' => $validatedData['description'] ?? '',
        'visitor' => $validatedData['visitor'] ?? '',
        'nationid' => $validatedData['nationid'],
        'ratingScore' => $validatedData['ratingScore'] ?? '',
        'avartar_url' => $validatedData['avartar_url'] ?? ''
    ]);

    // Return the updated beach data as JSON
    return response()->json($beach);
}

public function show_library($id) 
{
$imgs= Image_libraries::where('beachid',$id)->get();
return response()->json($imgs);
}

public function continent_index() {
    $continent = Continents::all();
    return response()->json($continent);
}


public function destroy($id)
{
    // Find the beach by ID
    $beach = Beaches::find($id);

    // Check if the beach does not exist
    if (!$beach) {
        return response()->json(['message' => 'Beach not found'], 404);
    }

    // Delete the beach
    $beach->delete();

    // Return a success response
    return response()->json(['message' => 'Beach deleted successfully'], 200);
}


}
