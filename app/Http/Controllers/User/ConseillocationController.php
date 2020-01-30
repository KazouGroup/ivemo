<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Http\Resources\ConseillocationResource;
use App\Model\categoryannoncelocation;
use App\Model\conseillocation;
use Illuminate\Http\Request;

class ConseillocationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'api', 'apiconseillocations',
            'apiconseillocationbycategoryannoncelocation','apiconseillocationbycategoryannoncelocationslug'
        ]]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return view('user.conseillocation.index');
    }

    public function api()
    {
        $conseillocations =  ConseillocationResource::collection(conseillocation::with('user','categoryannoncelocation')->latest()->get());

        return response()->json($conseillocations,200);
    }

    public function apiconseillocations()
    {
        $conseillocations =  ConseillocationResource::collection(conseillocation::with('user','categoryannoncelocation')
            ->where('status',1)->latest()->get());

        return response()->json($conseillocations,200);
    }

    public function apiconseillocationbycategoryannoncelocation($categoryannoncelocation)
    {
        $conseillocations = new CategoryannoncelocationResource(categoryannoncelocation::whereSlug($categoryannoncelocation)->first());

        return response()->json($conseillocations,200);
    }

    public function apiconseillocationbycategoryannoncelocationslug($categoryannoncelocation,$conseillocation)
    {

        $conseillocation = new ConseillocationResource(conseillocation::whereSlug($conseillocation)->firstOrFail());

        return response()->json($conseillocation,200);
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
        $conseillocation = new ConseillocationResource(conseillocation::where('id', $id)->findOrFail($id));

        return response()->json($conseillocation,200);
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
