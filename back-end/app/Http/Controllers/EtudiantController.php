<?php

namespace App\Http\Controllers;

use App\Models\Designer;
use App\Models\Etudiant;
use App\Models\Filiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $etudiants = Etudiant::all()->load('group.filiere');
        return response()->json($etudiants);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'cin' => 'required',
            'nom' => 'required',
            'prenom' => 'required',
            'numero_stagiaire' => 'required',
            'numero_parent' => 'required',
            'filiere_id' => 'required',
            'designer_id' => 'required',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }

        $filiere = Filiere::find($request->filiere_id);
        if (!$filiere) {
            return response()->json(['message2' => 'Filiere not found'], 404);
        }

        $designer = Designer::find($request->designer_id);
        if (!$designer) {
            return response()->json(['message1' => 'Designer not found'], 404);
        } 

        $etudiant = new Etudiant();
        $etudiant->cin = $request->cin;
        $etudiant->nom = $request->nom;
        $etudiant->prenom = $request->prenom;
        $etudiant->numero_stagiaire = $request->numero_stagiaire;
        $etudiant->numero_parent = $request->numero_parent;
        $etudiant->filiere_id = $request->filiere_id;
        $etudiant->designer_id = $request->designer_id;
        $etudiant->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $etudiants = Etudiant::find($id);
        if (!$etudiants) {
            return response()->json(['message' => 'Etudiant not found'], 404);
        }
        return response()->json($etudiants);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Etudiant $etudiant)
    {
        $rules = [
            'cin' => 'required',
            'nom' => 'required',
            'prenom' => 'required',
            'numero_stagiaire' => 'required',
            'numero_parent' => 'required',
            'filiere_id' => 'required',
            'designer_id' => 'required',
        ];
        
        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }

        $filiere = Filiere::find($request->filiere_id);
        if (!$filiere) {
            return response()->json(['message' => 'Filiere not found'], 404);
        }

        $etudiant = Etudiant::find($etudiant->id);
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant not found'], 404);
        }

        $etudiant->cin = $request->cin;
        $etudiant->nom = $request->nom;
        $etudiant->prenom = $request->prenom;
        $etudiant->numero_stagiaire = $request->numero_stagiaire;
        $etudiant->numero_parent = $request->numero_parent;
        $etudiant->filiere_id = $request->filiere_id;
        $etudiant->designer_id = $request->designer_id;
        $etudiant->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $etudiant = Etudiant::find($id);
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant not found'], 404);
        }
        $etudiant->delete();

        return response()->json(['message' => 'Etudiant deleted successfully'], 200);
    }
}
