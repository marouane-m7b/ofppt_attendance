<?php

namespace App\Http\Controllers;

use App\Models\Designer;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::with('filiere')->get();
        return response()->json($groups);
    }

    public function store(Request $request)
    {
        $rules = [
            'nom' => 'required',
            'filiere_id' => 'required|exists:filieres,id',
        ];

        $validate = Validator::make($request->all(), $rules);
        if ($validate->fails()) {
            return response()->json($validate->messages(), 400);
        }

        $group = Group::create($request->all());
        return response()->json(["data" => $group, "message" => "Group successfully added"], 201);
    }

    public function update(Request $request, Group $group)
    {
        $rules = [
            'nom' => 'required',
            'filiere_id' => 'required|exists:filieres,id',
        ];

        $validate = Validator::make($request->all(), $rules);
        if ($validate->fails()) {
            return response()->json($validate->messages(), 400);
        }

        $group->update($request->all());
        return response()->json(["data" => $group, "message" => "Group successfully updated"], 200);
    }

    public function destroy(Group $group)
    {
        $group->delete();
        return response()->json(null, 204);
    }

    public function listByFiliere($filiere_id)
    {
        $groups = Group::where('filiere_id', $filiere_id)->get();
        return response()->json($groups);
    }

    public function formateurGroups(Request $request)
    {
        $formateur = $request->user();
        $groups = $formateur->groups;
        return response()->json($groups);
    }
}
