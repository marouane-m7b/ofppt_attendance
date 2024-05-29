<?php

namespace App\Http\Controllers;

use App\Models\Absence;
use App\Models\Alert;
use App\Models\Etudiant;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $absences = Absence::all();
        return response()->json($absences);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $designer = request()->user("designer");
        $validator = request()->user("validator");

        if (!$designer && !$validator) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $rules = [
            'etudiant_id' => 'required',
            'duree' => 'required',
            'commentaire' => 'required'
        ];

        $validate = validator($request->all(), $rules);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }

        $etudiant = Etudiant::find($request->etudiant_id);
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant not found'], 404);
        }

        $absence = new Absence();


        if ($validator) {
            $absence->validator_id = $validator->id;
        }
        if ($designer) {
            $absence->designer_id = $designer->id;
        }

        $absence->etudiant_id = $request->etudiant_id;
        $absence->duree = $request->duree;
        $absence->commentaire = $request->commentaire;
        $absence->save();


        $absences = Absence::where('etudiant_id', $request->etudiant_id)->where('is_justified', 0)->get();

        $dureeTotal = 0;

        foreach ($absences as $absence) {
            $dureeTotal += $absence->duree;
        }

        if ($dureeTotal > 20) {
            $alert = new Alert();
            $alert->etudiant_id = $request->etudiant_id;
            $alert->duree = $dureeTotal;
            $alert->save();
        }


        return response()->json([
            'message' => 'Absence created successfully',
            'dureeTotal' => $dureeTotal
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Absence $absence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Absence $absence)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absence $absence)
    {
        //
    }
}
