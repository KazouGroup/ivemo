<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StoreRequest;
use App\Http\Requests\Contactuser\StorecontactRequest;
use App\Http\Resources\AnnoncereservationResource;
use App\Http\Resources\AnnoncetypeResource;
use App\Http\Resources\CategoryannoncereservationResource;
use App\Http\Resources\CityResource;
use App\Model\annoncereservation;
use App\Model\annoncetype;
use App\Model\categoryannoncereservation;
use App\Services\ContactuserService;
use App\Model\contactuser;
use App\Model\city;
use App\Model\reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnnoncereservationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','destroy','sendannoncereservation'
        ]]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(annoncetype $annoncetype)
    {
        return view('user.annoncereservation.annonces_index',[
           'annoncestype' => $annoncetype,
        ]);
    }

    public function annoncelocationbycategoryannoncereservation(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation)
    {
       return view('user.annoncereservation.annonces_category',[
               'annoncestype' => $annoncetype,
               'categoryannoncereservation' => $categoryannoncereservation,
            ]);
    }

    public function annoncereservationbycity(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city)
    {
        return view('user.annoncereservation.annonces_city',[
                   'annoncestype' => $annoncetype,
                   'categoryannoncereservation' => $categoryannoncereservation,
                   'city' => $city,
                ]);
    }

    public function annoncelocationbycategoryannoncereservationslug(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation)
    {

        return view('user.annoncereservation.annonces_show',[
                   'annoncetype' => $annoncetype,
                   'annoncereservation' => $annoncereservation,
                   'categoryannoncereservation' => $categoryannoncereservation,
                   'city' => $city,
                ]);
    }

    public function api()
    {
        $annoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user','categoryannoncelocation')->latest()->get());

        return response()->json($annoncelocations, 200);
    }

    public function apicategoryannoncereservation()
    {
        $categoryannoncereservations = CategoryannoncereservationResource::collection(categoryannoncereservation::with('user')
          ->withCount(['annoncereservations' => function ($q){
                        $q->where('status',1);
           }])
         ->orderBy('annoncereservations_count','desc')->distinct()->get());

        return response()->json($categoryannoncereservations, 200);
    }

    public function apiannoncereservations()
    {
        $annoncereservations = AnnoncereservationResource::collection(annoncereservation::with('user','categoryannoncereservation','city','annoncetype')
            ->where('status',1)->latest()->get());

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationbyannoncetype ($annoncetype)
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

    public function apiannoncereservationintersse(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city)
    {
        $annoncereservation = $categoryannoncereservation->annoncereservations()->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','city','annoncetype','categoryannoncereservation','imagereservations','imagereservations')
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->whereIn('city_id',[$city->id])
            ->orderByRaw('RAND()')
            ->where('status',1)
            ->take(4)->distinct()->get()->toArray();
        return response()->json($annoncereservation, 200);
    }

    public function apiannoncereservationbycity(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city)
    {
        $annoncereservations = $city->annoncereservations()->whereIn('city_id',[$city->id])
            ->with('user','categoryannoncereservation','city','annoncetype','imagereservations')
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->orderBy('created_at','DESC')->where('status',1)
            ->distinct()->get()->toArray();

        return response()->json($annoncereservations, 200);
    }

    public function apicitiesannonces()
    {
        $annoncereservations = CityResource::collection(city::with('user')->where('status',1)
            ->withCount(['annoncereservations' => function ($q){
                $q->where('status',1);
            }])
            ->orderBy('annoncereservations_count','desc')->take(6)->get());

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

    public function sendannoncereservation(StoreRequest $request, annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation)
    {
        $user = auth()->user();
        $reservation = new reservation();


        $reservation->fill($request->all());
        $reservation->user_id = $user->id;
        $reservation->annoncereservation_id = $annoncereservation->id;

        $reservation->save();

        return response()->json($reservation,200);
    }

     public function sendcontactmessageuser(StorecontactRequest $request, annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation)
    {

        $contactuser = new contactuser();

        $slug = sha1(('YmdHis') . str_random(30));
        $contactuser->fill($request->all());
        $contactuser->slug = $slug;
        $contactuser->user_id = $annoncereservation->user_id;
        $contactuser->annoncereservation_id = $annoncereservation->annoncereservation_id;

        ContactuserService::newEmailToannoncereservationpageShow($request,$annoncereservation);

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
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
