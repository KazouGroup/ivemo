<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryannonceventeResource;
use App\Http\Resources\ConseilventeResource;
use App\Model\categoryannoncevente;
use App\Model\conseilvente;
use Illuminate\Http\Request;

class ConseilventeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => [
            'api', 'apiconseilventes',
            'apiconseillocationbycategoryannoncevente', 'apiconseillocationbycategoryannonceventeslug'
        ]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function api()
    {
        $conseillocations = ConseilventeResource::collection(conseilvente::with('user', 'categoryannoncevente')
            ->latest()->get());

        return response()->json($conseillocations, 200);
    }

    public function apiconseilventes()
    {
        $conseillocations = ConseilventeResource::collection(conseilvente::with('user', 'categoryannoncevente')
            ->where('status', 1)->latest()->get());
        return response()->json($conseillocations, 200);
    }


    public function apiconseillocationbycategoryannoncevente($categoryannoncevente)
    {
        $conseillocations = new CategoryannonceventeResource(categoryannoncevente::whereSlug($categoryannoncevente)
            ->first());
        return response()->json($conseillocations, 200);
    }

    public function apiconseillocationbycategoryannonceventeslug($categoryannoncevente, $conseilvente)
    {
        $conseilvente = new ConseilventeResource(conseilvente::whereSlug($conseilvente)
            ->firstOrFail());
        return response()->json($conseilvente, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
