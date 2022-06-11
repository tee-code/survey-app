<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class AuthController extends Controller
{
    

    public function register(UserStoreRequest $request){

        try{
            $data = $request->validated();

            $data['password'] = bcrypt($data['password']);

            $user = User::create($data);

            $token = $user->createToken('main')->plainTextToken;

            return [
                'data' => $data,
                'token' => $token
            ];
        }catch(Exception $e){
            return response()->json($e);
        }

    }

    public function login(UserLoginRequest $request){

    }


}
