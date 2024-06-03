<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    public function index()
    {
        //
    }

    public function listClasses()
    {
        $id = auth('designer')->user()->id;

        $classes = Classe::where('designer_id', $id)->get();
        $classes->load('etudiants');

        return response($classes, 200);
    }
    public function store(Request $request)
    {
        //
    }

    public function show(int $id)
    {
        $classe = Classe::find($id);
        $classe->load('etudiants');
        return response($classe, 200);
    }

    public function update(Request $request, int $classe)
    {
        //
    }

    public function destroy(int $classe)
    {
        //
    }
}
