<?php

namespace App\Http\Controllers;

use App\Models\Designer;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::all();
        return response()->json($groups);
    }

    public function formateurGroups(Request $request)
    {
        $formateur = $request->user();
        $groups = $formateur->groups;
        return response()->json($groups);
    }
}
