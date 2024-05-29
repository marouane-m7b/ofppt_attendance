<?php

namespace App\Http\Controllers;

use App\Models\Designer;
use App\Models\Question;
use App\Models\Validator;
use App\Mail\QuestionMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator as ValidatorFunc;

class DesignerController extends Controller
{


    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($designer = Designer::where('email', $request->email)->first()) {
            if (!Hash::check($request->password, $designer->password)) {
                return response(['message' => 'Le mot de passe est incorrect', 'errors' => ['password' => ['Le mot de passe est incorrect']]], 422);
            }
        } else {
            return response(['message' => 'Cet utilisateur n\'existe pas', 'errors' => ['email' => ['Cet utilisateur n\'existe pas']]], 422);
        }

        return response([
            'token' => $designer->createToken('Designer')->plainTextToken
        ]);
    }


    public function logout()
    {
        auth('designer')->user()->tokens()->delete();
        return response(['message' => 'Deconnexion reussie']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $designers = Designer::all();
        return response()->json($designers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:designers',
        ]);

        $password = "ofppt";

        $designer = new Designer();
        $designer->first_name = $request->first_name;
        $designer->last_name = $request->last_name;
        $designer->email = $request->email;
        $designer->password = Hash::make($password);
        $designer->save();

        return response()->json(['message' => 'Concepteur cree avec succes', 'password' => $password], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Designer $designer)
    {
        return response()->json($designer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Designer $designer)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:designers,email,' . $designer->id,
        ]);

        $designer->first_name = $request->first_name;
        $designer->last_name = $request->last_name;
        $designer->email = $request->email;
        $designer->save();

        return response()->json(['message' => 'Concepteur mis a jour avec succes'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Designer $designer)
    {
        $designer->delete();
        return response()->json(['message' => 'concepteur a ete supprime avec succes']);
    }

    public function resetPassword($id)
    {
        $validator = Designer::find($id);
        $validator->password = Hash::make('ofppt');
        $validator->save();
        return response()->json($validator, 200);
    }


    public function sendQuestions(Request $request)
    {
        $rules = [
            'file' => 'required|mimes:csv,txt,pdf,doc,docx,xls,xlsx,jpeg,png,jpg|max:50000',
            'file_name' => 'required',
            'description' => 'required',
            'secteur_id' => 'required|exists:secteurs,id',
            // 'filiere_id' => 'required|exists:filieres,id',
        ];

        $data = $request->all();

        $validator = ValidatorFunc::make($data, $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }

        // Save file
        $uploadedFile = $request->file('file');
        $fileName = time();
        $fileExtension = $uploadedFile->extension();
        $filePath = $fileName . '.' . $fileExtension;

        // Check if the file already exists, delete if it does
        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }

        // Store the new file
        Storage::disk('public')->put($filePath, file_get_contents($uploadedFile));

        // Save question with file name
        $question = new Question();
        $question->file_path = $filePath; // Set file path here
        $question->file_name = $request->file_name;
        $question->description = $request->description;
        $question->secteur_id = $request->secteur_id;
        $question->filiere_id = $request->filiere_id;
        $question->designer_id = auth('designer')->user()->id;
        $question->save();
        // Validator::each(function ($validator) use ($question) {
        //     Mail::to($validator->email)->send(new QuestionMail(auth('designer')->user(), $question));
        // });
        return response(['message' => 'Questions envoyée']);
    }


    public function getQuestions()
    {
        $questions = Question::where('designer_id', auth('designer')->user()->id)->get();
        return response()->json($questions);
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
