<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
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
            'email' => 'required',
            'numero_stagiaire' => 'required',
            'numero_parent' => 'required',
            'group_id' => 'required|exists:groups,id',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }

        $etudiant = new Etudiant();
        $etudiant->cin = $request->cin;
        $etudiant->nom = $request->nom;
        $etudiant->prenom = $request->prenom;
        $etudiant->email = $request->email;
        $etudiant->numero_stagiaire = $request->numero_stagiaire;
        $etudiant->numero_parent = $request->numero_parent;
        $etudiant->group_id = $request->group_id;
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
            'email' => 'required',
            'numero_stagiaire' => 'required',
            'numero_parent' => 'required',
            'group_id' => 'required|exists:groups,id',
        ];

        $validate = Validator::make($request->all(), $rules);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }

        $etudiant = Etudiant::find($etudiant->id);
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant not found'], 404);
        }

        $etudiant->cin = $request->cin;
        $etudiant->nom = $request->nom;
        $etudiant->prenom = $request->prenom;
        $etudiant->email = $request->email;
        $etudiant->numero_stagiaire = $request->numero_stagiaire;
        $etudiant->numero_parent = $request->numero_parent;
        $etudiant->group_id = $request->group_id;
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

    public function getEtudiantsByGroup($id)
    {
        $etudiants = Etudiant::where('group_id', $id)->with('group.filiere')->get();
        return response()->json($etudiants);
    }
}
