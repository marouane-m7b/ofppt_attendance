<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Designer;
use App\Notifications\AppointmentCreated;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    private $workingHoursStart = 9;
    private $workingHoursEnd = 18;

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
            'date' => 'required|date_format:Y-m-d\TH:i:s\Z',
            'status' => 'required|in:pending,passed,cancelled',
        ]);

        $validator = $request->user('validator');
        if (!$validator) {
            return response()->json(['message' => 'Unauthorized'], 400);
        }

        if (!$validator->is_consultant) {
            return response()->json(['message' => 'Unauthorized'], 400);
        }

        $date = Carbon::parse($request->date);

        // Ensure time is within working hours
        $hour = $date->hour;
        if ($hour < $this->workingHoursStart || $hour >= $this->workingHoursEnd) {
            return response()->json(['message' => 'L\'heure de rendez-vous doit être entre 9h et 18h.'], 400);
        }

        // Ensure time is at 60-minute intervals
        if ($date->minute !== 0) {
            return response()->json(['message' => 'Le rendez-vous doit être fixé à une heure précise (ex : 14:00, 15:00).'], 400);
        }

        // Check for existing appointments at this time
        $existingAppointment = Appointment::where('validator_id', $validator->id)
            ->where('date', $date->format('Y-m-d H:i:s'))
            ->first();

        if ($existingAppointment) {
            return response()->json(['message' => 'Le consultant est occupé à ce moment-là.'], 400);
        }

        $appointment = Appointment::create([
            'etudiant_id' => $request->etudiant_id,
            'validator_id' => $validator->id,
            'date' => $date->format('Y-m-d H:i:s'),
            'status' => $request->status,
        ]);

        // Send notifications
        $appointment->etudiant->notify(new AppointmentCreated($appointment));
        $cgcpDesigners = Designer::where('is_cgcp', true)->get();
        foreach ($cgcpDesigners as $designer) {
            $designer->notify(new AppointmentCreated($appointment));
        }
        $validator->notify(new AppointmentCreated($appointment));

        return response()->json($appointment, 201);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        $request->validate([
            'date' => 'sometimes|date_format:Y-m-d\TH:i:s\Z',
            'status' => 'sometimes|in:pending,passed,cancelled',
        ]);

        if ($request->has('date')) {
            $date = Carbon::parse($request->date);

            // Ensure time is within working hours
            $hour = $date->hour;
            if ($hour < $this->workingHoursStart || $hour >= $this->workingHoursEnd) {
                return response()->json(['message' => 'L\'heure de rendez-vous doit être entre 9h et 18h.'], 400);
            }

            // Ensure time is at 60-minute intervals
            if ($date->minute !== 0) {
                return response()->json(['message' => 'Le rendez-vous doit être fixé à une heure précise (ex : 14:00, 15:00).'], 400);
            }

            $appointment->date = $date->format('Y-m-d H:i:s');
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
