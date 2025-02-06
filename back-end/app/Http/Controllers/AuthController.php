<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function login(LoginRequest $request)
    {
       $data = $request->validated();
       if(!Auth::attempt($data)){
           return response()->json(['message'=>'email or password is incorrect']);
       }
       $users = Auth::user();
         $token = $users->createToken('main')->plainTextToken;

            return response()->json(['users'=>$users,'token' => $token]);
    }

    public function register(RegisterRequest $request)
    {
        $data =$request->validated();
        $user =User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('avartar'), $name);
            $user->image_url = 'http://127.0.0.1:8000/avartar/' . $name;
            $user->save();
        }


         $token = $user->createToken('main')->plainTextToken;
         return response()->json(['user'=>$user,'token' => $token,'data'=>$data]);
        //return response()->json(['data'=>$data]);
    }

 
    public function logout(Request $request)
    {
        $user = $request->user();
    
        if ($user) {
            $user->currentAccessToken()->delete();
            return response('', 204);
        }
    
        return response()->json(['error' => 'User not authenticated'], 401);
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json(['user' => $user], 200);
        }

        return response()->json(['error' => 'User not found'], 404);
    }

}
