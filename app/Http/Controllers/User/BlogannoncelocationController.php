<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncelocationResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\user;
use App\Services\BlogannoncelocationService;
use Illuminate\Http\Request;

class BlogannoncelocationController extends Controller
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

    public function apiannonceblogcategorylocations($categoryannoncelocation)
    {
        $blogannoncelocations = new CategoryannoncelocationResource(categoryannoncelocation::whereSlug($categoryannoncelocation)
            ->first());
        return response()->json($blogannoncelocations, 200);
    }


    public function apiblogannoncelocationinteresse(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = BlogannoncelocationService::apiblogannoncelocationinteresse($categoryannoncelocation);

        return response()->json($blogannoncelocations, 200);
    }

    public function apiannonceblogcategorylocationslug($categoryannoncelocation, $date,$blogannoncelocation)
    {
        $blogannoncelocation = BlogannoncelocationService::apiannonceblogcategorylocationslug($categoryannoncelocation, $date,$blogannoncelocation);

        return response()->json($blogannoncelocation, 200);
    }


    public function apiblogsannoncereservationspublique(user $user)
    {
        $blogannoncelocations = blogannoncelocation::whereIn('user_id',[$user->id])
            ->orderBy('created_at','DESC')
            ->where('status',1)->get()->toArray();

        return response()->json($blogannoncelocations, 200);

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
