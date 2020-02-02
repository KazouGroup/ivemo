<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnoncereservationResource;
use App\Http\Resources\AnnoncetypeResource;
use App\Http\Resources\CategoryannoncereservationResource;
use App\Model\annoncereservation;
use App\Model\annoncetype;
use App\Model\categoryannoncereservation;
use App\Model\city;
use Illuminate\Http\Request;

class AnnoncereservationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'api','apiannoncereservations','apiannoncereservationbyannoncetype','apiannoncereservationbycity',
            'apiannoncelocationbycategoryannoncereservation','apiannoncelocationbycategoryannoncereservationslug'
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
        $annoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user','categoryannoncelocation')->latest()->get());

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncereservations()
    {
        $annoncereservations = AnnoncereservationResource::collection(annoncereservation::with('user','categoryannoncereservation','city','annoncetype')
            ->where('status',1)->latest()->get());

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncelocationbyannoncetype($annoncetype)
    {
        $annonces = new AnnoncetypeResource(annoncetype::whereSlug($annoncetype)
            ->first());

        return response()->json($annonces, 200);
    }

    public function apiannoncelocationbycategoryannoncereservation($annoncetype,$categoryannoncereservation)
    {
        $annoncereservation = new CategoryannoncereservationResource(categoryannoncereservation::whereSlug($categoryannoncereservation)
            ->first());
        return response()->json($annoncereservation, 200);
    }

    public function apiannoncereservationbycity(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city)
    {
        $annoncereservations = $city->annoncereservations()->with('user','categoryannoncereservation','city','annoncetype')
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->where('status',1);
            })->distinct()->get()->toArray();

        return response()->json($annoncereservations, 200);
    }


    public function apiannoncelocationbycategoryannoncereservationslug(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$annoncereservation)
    {
        $annoncereservation = new AnnoncereservationResource(annoncereservation::whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->where('status',1)
            ->whereSlug($annoncereservation)->firstOrFail());

        return response()->json($annoncereservation, 200);
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
