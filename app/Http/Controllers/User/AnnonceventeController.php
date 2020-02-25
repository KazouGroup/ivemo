<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnonceventeResource;
use App\Http\Resources\AnnoncetypeResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Http\Resources\CategoryannonceventeResource;
use App\Model\annoncevente;
use App\Model\annoncetype;
use App\Model\categoryannoncevente;
use App\Model\city;
use App\Services\AnnonceventeService;
use Illuminate\Http\Request;

class AnnonceventeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['only' => [
            'create', 'store', 'edit', 'update', 'destroy'
        ]]);
    }

    public function api()
    {
        $annonceventes = AnnonceventeResource::collection(annoncevente::with('user', 'categoryannoncevente')->latest()->get());

        return response()->json($annonceventes, 200);
    }

    public function apiannoncevente()
    {
        $annoncevente = AnnonceventeResource::collection(annoncevente::with('user', 'categoryannoncevente', 'city', 'annoncetype')
        ->where(['status' => 1,'status_admin' => 1])->latest()->get());

        return response()->json($annoncevente, 200);
    }

    public function apicategoryannoncevente()
    {
        $categoryannonceventes = CategoryannonceventeResource::collection(categoryannoncevente::with('user')
            ->withCount(['annonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])
            ->orderBy('annonceventes_count','desc')
            ->distinct()->get());

        return response()->json($categoryannonceventes, 200);    }


    public function apiannonceventebyannoncetype(annoncetype $annoncetype)
    {
        $annoncesventes = $annoncetype->annonceventes()->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncevente','city','annoncetype')
            ->orderBy('created_at','DESC')
            ->where(['status' => 1,'status_admin' => 1])
            ->distinct()->paginate(30)->toArray();

        return response()->json($annoncesventes, 200);
    }

    public function apiannonceventebycategoryannoncevente(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente)
    {
        $annoncevente = categoryannoncevente::whereSlug($categoryannoncevente->slug)
            ->with([
                'annonceventes' => function ($q) use ($annoncetype,$categoryannoncevente){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->with('user','categoryannoncevente','city','annoncetype')
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                        ->orderBy('created_at','DESC')->distinct()->paginate(30)->toArray();},
            ])->first();
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
        ->where(['status' => 1,'status_admin' => 1])
        ->whereSlug($annoncevente)->firstOrFail());

        return response()->json($annoncevente, 200);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\Response|\Illuminate\View\View
     */
    public function index(annoncetype $annoncetype)
    {
        return view('user.annoncevente.annonce_index',[
            'annoncetype' => $annoncetype,
        ]);
    }

    public function apiannonceventebycategorycitycount(categoryannoncevente $categoryannoncevente )
    {
        $annoncesbycategoriescities = AnnonceventeService::apiannonceventebycategorycitycount($categoryannoncevente);

        return response()->json($annoncesbycategoriescities, 200);
    }

    public function apiannonceventecategorybycitycount(categoryannoncevente $categoryannoncevente,city $city )
    {
        $data = AnnonceventeService::apiannoncelocationcategorybycitycount($categoryannoncevente,$city);

        return response()->json($data, 200);
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
