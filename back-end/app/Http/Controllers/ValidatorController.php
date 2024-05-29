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
            'secteur_id' => 'required',
        ]);

        $password = 'ofppt';

        $validator = new Validator();
        $validator->fill($request->all());
        $validator->password = Hash::make($password);
        $validator->save();

        return response()->json(['message' => 'Validator created successfully', 'password' => $password], 201);
    }

    // Show method to display the specified validator
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
            'password' => 'string|min:6',
        ]);

        $validator->update($request->all());

        return response()->json(['message' => 'Validator updated successfully'], 200);
    }

    // Destroy method to delete the specified validator
    public function destroy(Validator $validator)
    {
        $validator->delete();
        return response()->json(['message' => 'Validator deleted successfully'], 200);
    }

    public function resetPassword($id)
    {
        $validator = Validator::find($id);
        $validator->password = Hash::make('ofppt');
        $validator->save();
        return response()->json($validator, 200);
    }

    public function questionsToValidate()
    {
        $validator = auth('validator')->user();
        $questions = Question::where('secteur_id', $validator->secteur_id)->where('is_visible', false)->get();
        return response()->json($questions, 200);
    }

    public function questionsValidated()
    {
        $validator = auth('validator')->user();
        $questions = Question::where('secteur_id', $validator->secteur_id)->where('is_visible', true)->get();
        return response()->json($questions, 200);
    }

    public function downloadQuestions($id)
    {
        $question = Question::find($id);
        if ($question) {
            $fileName = $question->file_path;
            $filePath = storage_path('app/public/' . $fileName);

            if (!file_exists($filePath)) {
                return response()->json([
                    "status" => 404,
                    "message" => "cette question n'a pas une pdf"
                ]);
            }

            $namePdf = 'Exam_' . $question->file_name . '.pdf';
            return response()->download($filePath, $namePdf);
        } else {
            return response()->json([
                "status" => 404,
                "message" => "question non trouvé"
            ]);
        }
    }
}
