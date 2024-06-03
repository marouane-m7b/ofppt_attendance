<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Validator;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ValidatorController extends Controller
{
    // Method for logging in a validator
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $validator = Validator::where('email', $request->email)->first();
        if ($validator) {
            if (!Hash::check($request->password, $validator->password)) {
                return response(['message' => 'Le mot de passe est incorrect', 'errors' => ['password' => ['Le mot de passe est incorrect']]], 422);
            }
        } else {
            return response(['message' => 'Cet utilisateur n\'existe pas', 'errors' => ['email' => ['Cet utilisateur n\'existe pas']]], 422);
        }

        return response([
            'token' => $validator->createToken('Validator')->plainTextToken
        ]);
    }

    public function logout()
    {
        auth('validator')->user()->tokens()->delete();
        return response(['message' => 'Deconnexion reussie']);
    }

    // Index method to retrieve a list of validators
    public function index()
    {
        $validators = Validator::all();
        return response()->json($validators, 200);
    }

    // Store method to store a newly created validator
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:validators,email',
        ]);

        $password = Str::random(8);

        $validator = new Validator();
        $validator->fill($request->all());
        $validator->password = Hash::make($password);
        $validator->save();

        return response()->json(['message' => 'Validateur créé avec succès', 'password' => $password], 201);
    }

    // Afficher la méthode pour afficher le validateur spécifié
    public function show(Validator $validator)
    {
        return response()->json(['validator' => $validator], 200);
    }

    // Update method to update the specified validator
    public function update(Request $request, Validator $validator)
    {
        $request->validate([
            'first_name' => 'string',
            'last_name' => 'string',
            'email' => 'email|unique:validators,email,' . $validator->id,
        ]);

        $validator->update($request->all());

        return response()->json(['message' => 'Validateur mis à jour avec succès'], 200);
    }

    // Destroy method to delete the specified validator
    public function destroy(Validator $validator)
    {
        $validator->delete();
        return response()->json(['message' => 'Validateur supprimé avec succès'], 200);
    }

    public function resetPassword($id)
    {
        $validator = Validator::find($id);
        $password = Str::random(8);
        $validator->password = Hash::make($password);
        $validator->save();

        return response()->json(['message' => 'Mot de passe mis à jour', 'password' => $password], 201);
    }
}
