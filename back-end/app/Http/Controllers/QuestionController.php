<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Mail\IsQuestions;
use App\Models\Critere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\New_;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Question::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        return $question;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $question = Question::find($id);
        if (!$question) return response()->json(['message' => 'question introuvable']);
        $question->delete();
        return response()->json(['message' => 'question a ete supprime avec succes']);
    }

    public function getQuestionsDetails($id)
    {
        $question = Question::find($id);
        if (!$question) return response()->json(['message' => 'question introuvable']);
        return response()->json($question);
    }

    public function accept()
    {
        $request = request();
        $request->validate([
            'questions_id' => 'required|exists:questions,id',
        ]);
        $question = Question::find($request->questions_id);
        if (!$question) return response(['message' => 'Questions introuvable'], 404);


        $question->is_accepted = true;
        $question->save();

        Mail::to($question->designer->email)->send(new IsQuestions($question, true));
    }

    public function reject()
    {
        $request = request();
        $request->validate([
            'questions_id' => 'required|exists:questions,id',
        ]);
        $question = Question::find($request->questions_id);
        if (!$question) return response(['message' => 'Questions introuvable'], 404);


        $question->is_accepted = false;
        $question->save();

        Mail::to($question->designer->email)->send(new IsQuestions($question, false));
    }



    public function validateQuestion()
    {
        $rules = [
            'questions_id' => 'required|exists:questions,id',
            'points' => 'required|numeric',
            'commentaire' => 'required',
            'Entete_commentaire' => 'required',
            'Filiere_commentaire' => 'required',
            'Groupe_commentaire' => 'required',
            'Duree_commentaire' => 'required',
            'Intitule_commentaire' => 'required',
            'Bareme_commentaire' => 'required',
            'Epreuve_commentaire' => 'required',
            'Duree_suffisante_commentaire' => 'required',
            'Sommation_commentaire' => 'required',
            'criteria1' => 'required',
            'criteria2' => 'required',
            'criteria3' => 'required',
            'criteria4' => 'required',
            'criteria5' => 'required',
            'criteria6' => 'required',
            'criteria7' => 'required',
            'criteria8' => 'required',
            'criteria9' => 'required',
            'criteria1IsChecked' => 'required|boolean',
            'criteria2IsChecked' => 'required|boolean',
            'criteria3IsChecked' => 'required|boolean',
            'criteria4IsChecked' => 'required|boolean',
            'criteria5IsChecked' => 'required|boolean',
            'criteria6IsChecked' => 'required|boolean',
            'criteria7IsChecked' => 'required|boolean',
            'criteria8IsChecked' => 'required|boolean',
            'criteria9IsChecked' => 'required|boolean',
        ];

        $request = request();

        $validate = Validator::make($request->all(), $rules);
        if ($validate->fails()) return response($validate->errors(), 400);

        $question = Question::find($request->questions_id);
        if (!$question) {
            return response(['message' => 'Questions introuvable'], 404);
        };

        $question->is_accepted = $request->points >= 90;
        $question->is_visible = true;
        $question->commentaire = $request->commentaire;
        $question->points = $request->points;
        $question->validator_id = $request->user()->id;
        $question->save();

        $criteria = [
            ['name' => 'criteria1', 'commentaire' => 'Entete_commentaire', 'is_valid' => 'criteria1IsChecked'],
            ['name' => 'criteria2', 'commentaire' => 'Filiere_commentaire', 'is_valid' => 'criteria2IsChecked'],
            ['name' => 'criteria3', 'commentaire' => 'Groupe_commentaire', 'is_valid' => 'criteria3IsChecked'],
            ['name' => 'criteria4', 'commentaire' => 'Duree_commentaire', 'is_valid' => 'criteria4IsChecked'],
            ['name' => 'criteria5', 'commentaire' => 'Intitule_commentaire', 'is_valid' => 'criteria5IsChecked'],
            ['name' => 'criteria6', 'commentaire' => 'Bareme_commentaire', 'is_valid' => 'criteria6IsChecked'],
            ['name' => 'criteria7', 'commentaire' => 'Epreuve_commentaire', 'is_valid' => 'criteria7IsChecked'],
            ['name' => 'criteria8', 'commentaire' => 'Duree_suffisante_commentaire', 'is_valid' => 'criteria8IsChecked'],
            ['name' => 'criteria9', 'commentaire' => 'Sommation_commentaire', 'is_valid' => 'criteria9IsChecked'],
        ];

        foreach ($criteria as $criterion) {
            Critere::create([
                'name' => $request->{$criterion['name']},
                'description' => $request->{$criterion['commentaire']},
                'is_valid' => $request->{$criterion['is_valid']},
                'question_id' => $question->id,
            ]);
        }

        return response(['message' => 'Bien Valide'], 200);
    }


    public function getAdminQuestions()
    {
        $questions = Question::where('is_visible', true)->get();
        return response()->json($questions);
    }

    public function getQuestions($id)
    {
        $question = Question::find($id);
        if (!$question) return response()->json(['message' => 'question introuvable']);
        return response()->json($question);
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
