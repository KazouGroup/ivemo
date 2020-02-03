<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnoncelocationResource;
use App\Http\Resources\AnnoncetypeResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Http\Resources\CityResource;
use App\Model\annoncelocation;
use App\Model\annoncetype;
use App\Model\categoryannoncelocation;
use App\Model\city;
use Illuminate\Http\Request;

class AnnoncelocationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','destroy'
        ]]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('user.annonce.annoncelocation.index');
    }

    public function api()
    {
        $annoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user','categoryannoncelocation')->latest()->get());

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocations()
    {
        $annoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user','categoryannoncelocation')
            ->where('status',1)->latest()->get());

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocationbyannoncetype($annoncetype)
    {
        $annonces = new AnnoncetypeResource(annoncetype::whereSlug($annoncetype)
            ->first());

        return response()->json($annonces, 200);
    }

    public function apiannoncelocationbycategoryannoncelocation($annoncetype,$categoryannoncelocation)
    {
        $annoncelocation = new CategoryannoncelocationResource(categoryannoncelocation::whereSlug($categoryannoncelocation)
            ->first());
        return response()->json($annoncelocation, 200);
    }

    public function apiannoncelocationbycity(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city)
    {
        $annoncelocations = $city->annoncelocations()
            ->with('user','categoryannoncelocation','city','annoncetype')
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->where('status',1);
            })->distinct()->get()->toArray();

        return response()->json($annoncelocations, 200);
    }

    public function apicitiesannonces()
    {
        $annoncelocations = CityResource::collection(city::with('user')
            ->where('status',1)
            ->withCount(['annoncelocations' => function ($q){
                $q->where('status',1);
            }])
            ->orderBy('annoncelocations_count','desc')->get());

        return response()->json($annoncelocations, 200);
    }


    public function apiannoncelocationbycategoryannoncelocationslug(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$annoncelocation)
    {
        $annoncelocation = new AnnoncelocationResource(annoncelocation::whereIn('annoncetype_id',[$annoncetype->id])
        ->whereIn('city_id',[$city->id])
        ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
        ->where('status',1)
        ->whereSlug($annoncelocation)->firstOrFail());

        return response()->json($annoncelocation, 200);
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
