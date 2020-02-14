<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactRequest;
use App\Http\Resources\AnnoncelocationResource;
use App\Http\Resources\AnnoncetypeResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Http\Resources\CityResource;
use App\Model\annoncelocation;
use App\Model\annoncetype;
use App\Model\categoryannoncelocation;
use App\Model\city;
use App\Model\contactuser;
use App\Services\AnnoncelocationService;
use App\Services\ContactuserService;
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
    public function index(annoncetype $annoncetype)
    {
        return view('user.annoncelocation.annonces_index',[
            'annoncestype' => $annoncetype,
        ]);
    }


   public function annoncelocationbycategoryannoncelocation(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation)
   {
      return view('user.annoncelocation.annonces_category',[
              'annoncestype' => $annoncetype,
              'categoryannoncelocation' => $categoryannoncelocation,
           ]);
   }

    public function annoncelocationnbycity(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city)
    {
        return view('user.annoncelocation.annonces_city',[
            'annoncetype' => $annoncetype,
            'categoryannoncelocation' => $categoryannoncelocation,
            'city' => $city,
        ]);
    }

    public function annoncelocationbycategoryannoncelocationslug(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$date,annoncelocation $annoncelocation)
    {
        return view('user.annoncelocation.annonces_show',[
            'annoncelocation' => $annoncelocation,
        ]);
    }


    public function api()
    {
        $annoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user','categoryannoncelocation')->latest()->get());

        return response()->json($annoncelocations, 200);
    }

    public function apicategoryannoncelocation()
    {
        $categoryannoncelocations = CategoryannoncelocationResource::collection(categoryannoncelocation::with('user')
            ->withCount(['annoncelocations' => function ($q){
                $q->where('status',1);
            }])
            ->orderBy('annoncelocations_count','desc')
            ->distinct()->get());

        return response()->json($categoryannoncelocations, 200);
    }

    public function apiannoncelocationbycategorycitycount(categoryannoncelocation $categoryannoncelocation)
    {
        $annoncesbycategoriescities = AnnoncelocationService::apiannoncelocationbycategorycitycount($categoryannoncelocation);

        return response()->json($annoncesbycategoriescities, 200);
    }

    public function apiannoncelocationcategorybycitycount(categoryannoncelocation $categoryannoncelocation,city $city)
    {
       $data = AnnoncelocationService::apiannoncelocationcategorybycitycount($categoryannoncelocation,$city);

        return response()->json($data, 200);
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
        $annoncelocations = AnnoncelocationService::apiannoncelocationbycity($annoncetype,$categoryannoncelocation,$city);

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


    public function apiannoncelocationbycategoryannoncelocationslug(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$date,$annoncelocation)
    {
        $annoncelocation = AnnoncelocationService::apiannoncelocationbycategoryannoncelocationslug($annoncetype,$categoryannoncelocation,$city,$date,$annoncelocation);

        return response()->json($annoncelocation, 200);
    }


    public function sendcontactmessageuser(StorecontactRequest $request, annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$date,annoncelocation $annoncelocation)
    {

        $contactuser = new contactuser();

        $slug = sha1(('YmdHis') . str_random(30));
        $contactuser->fill($request->all());
        $contactuser->slug = $slug;
        $contactuser->user_id = $annoncelocation->user->id;
        $contactuser->annoncelocation_id = $annoncelocation->id;

        ContactuserService::newEmailToannoncelocationpageShow($request,$annoncelocation);

        $contactuser->save();

        return response()->json($contactuser,200);
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
     * @return array|\Illuminate\Http\Response
     */
    public function destroy(annoncetype $annoncetype,$id)
    {
        $annoncelocation = annoncelocation::findOrFail($id);
        $annoncelocation->delete();
        return ['message' => 'message deleted '];


       // //$this->authorize('update',$contactuser);
       // if (auth()->user()->id === $annoncelocation->user_id){
       //     //$annoncelocation->delete();
       //     //return ['message' => 'message deleted '];
       // }else{
       //     abort(404);
       // }
    }
}
