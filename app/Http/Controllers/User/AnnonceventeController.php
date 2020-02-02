<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnonceventeResource;
use App\Http\Resources\AnnoncetypeResource;
use App\Http\Resources\CategoryannonceventeResource;
use App\Model\annoncevente;
use App\Model\annoncetype;
use App\Model\categoryannoncevente;
use App\Model\city;
use Illuminate\Http\Request;

class AnnonceventeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'apiannonceventebyannoncetype','apiannonceventebycity',
            'apiannonceventebycategoryannoncevente','apiannonceventebycategoryannonceventeslug'
        ]]);
    }

    public function apiannonceventebyannoncetype(annoncetype $annoncetype)
    {
        $annoncesventetypes = new AnnoncetypeResource(annoncetype::whereSlug($annoncetype->slug)
            ->first());

        return response()->json($annoncesventetypes, 200);
    }

    public function apiannonceventebycategoryannoncevente($annoncetype,$categoryannoncevente)
    {
        $annoncevente = new CategoryannonceventeResource(categoryannoncevente::whereSlug($categoryannoncevente)
            ->first());
        return response()->json($annoncevente, 200);
    }

    public function apiannonceventebycity(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city)
    {
        $annonceventecities = $city->annonceventes()->with('user','categoryannoncevente','city','annoncetype')
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->where('status',1);
            })->distinct()->get()->toArray();

        return response()->json($annonceventecities, 200);
    }

    public function apiannonceventebycategoryannonceventeslug(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$annoncevente)
    {
        $annoncevente = new AnnonceventeResource(annoncevente::whereIn('annoncetype_id',[$annoncetype->id])
        ->whereIn('city_id',[$city->id])
        ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
        ->where('status',1)
        ->whereSlug($annoncevente)->firstOrFail());

        return response()->json($annoncevente, 200);
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

    /**
     * Show the form for creating a new resource
     * .
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
