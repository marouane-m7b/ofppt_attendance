<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    public function index()
    {
        $validator = request()->user('validator');
        if ($validator) {
            return Appointment::with('etudiant', 'validator')->where('validator_id', $validator->id)->get();
        }
        return Appointment::with('etudiant', 'validator')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'etudiant_id' => 'required|exists:etudiants,id',
            'date' => 'required|date',
            'status' => 'required|in:pending,passed,cancelled',
        ]);

        $validator = $request->user('validator');
        if (!$validator) {
            return response()->json(['message' => 'Unauthorized'], 400);
        }

        $date = Carbon::parse($request->date)->format('Y-m-d H:i:s');
        $existingAppointment = Appointment::where('validator_id', $validator->id)
            ->where('date', $date)
            ->first();

        if ($existingAppointment) {
            return response()->json(['message' => 'Le consultant est occupé à ce moment-là.'], 400);
        }

        $appointment = Appointment::create([
            'etudiant_id' => $request->etudiant_id,
            'validator_id' => $validator->id,
            'date' => $date,
            'status' => $request->status,
        ]);

        return response()->json($appointment, 201);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        $request->validate([
            'date' => 'sometimes|date',
            'status' => 'sometimes|in:pending,passed,cancelled',
        ]);

        if ($request->has('date')) {
            $appointment->date = Carbon::parse($request->date)->format('Y-m-d H:i:s');
        }

        if ($request->has('status')) {
            $appointment->status = $request->status;
        }

        $appointment->save();

        return response()->json($appointment, 200);
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->noContent();
    }
}
