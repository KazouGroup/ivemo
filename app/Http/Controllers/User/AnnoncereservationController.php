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
use App\Model\user;
use App\Services\AnnoncereservationService;
use App\Model\contactuser;
use App\Model\city;
use App\Model\reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AnnoncereservationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','destroy','sendannoncereservation','annoncesreservationsbyuser','apiannoncesreservationsbyuser'
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

    public function annoncereservationsbyannoncetypebycity(annoncetype $annoncetype,city $city)
    {
        return view('user.annoncereservation.annonces_by_city',[
                   'annoncestype' => $annoncetype,
                   'city' => $city,
                ]);
    }

    public function annoncelocationbycategoryannoncereservationslug(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation)
    {
        visits($annoncereservation)->seconds(60)->increment();

        return view('user.annoncereservation.annonces_show',[
                   'annoncetype' => $annoncetype,
                   'annoncereservation' => $annoncereservation,
                   'categoryannoncereservation' => $categoryannoncereservation,
                   'city' => $city,
                ]);
    }

    public function apicategoryannoncereservation()
    {
        $categoryannoncereservations = CategoryannoncereservationResource::collection(categoryannoncereservation::with('user')
          ->where(['status' => 1])
          ->withCount(['annoncereservations' => function ($q){
              $q->where(['status' => 1,'status_admin' => 1])
                  ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                  ->whereHas('city', function ($q) {$q->where('status',1);});
           }])
            ->withCount(['blogannoncereservations' => function ($q){
               $q->where(['status' => 1,'status_admin' => 1])
                   ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('annoncereservations_count','desc')
            ->distinct()->get());

        return response()->json($categoryannoncereservations, 200);
    }

    public function apicategoryannoncereservationbycity(city $city)
    {
        $categoryannoncereservations = CategoryannoncereservationResource::collection(categoryannoncereservation::with('user')
          ->where(['status' => 1])
          ->withCount(['annoncereservations' => function ($q) use ($city){
              $q->where(['status' => 1,'status_admin' => 1])
                  ->whereIn('city_id',[$city->id])
                  ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                  ->whereHas('city', function ($q) {$q->where('status',1);});
           }])
            ->orderBy('annoncereservations_count','desc')
            ->distinct()->get());

        return response()->json($categoryannoncereservations, 200);
    }

    public function apicategoryannoncereservations_by_user()
    {
        $categoryannoncereservations = CategoryannoncereservationResource::collection(categoryannoncereservation::with('user')
          ->where(['status' => 1])
          ->withCount(['annoncereservations' => function ($q){
              $q->whereHas('city', function ($q) {$q->where('status',1);})
                  ->whereIn('user_id',[auth()->user()->id])
                  ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);});
           }])->withCount(['blogannoncereservations' => function ($q){
               $q->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                   ->whereIn('user_id',[auth()->user()->id])
                   ->where('status_admin',1);}])
         ->orderBy('annoncereservations_count','desc')->distinct()->get());

        return response()->json($categoryannoncereservations, 200);
    }

    public function apiannoncereservations()
    {
        $annoncereservations = AnnoncereservationResource::collection(annoncereservation::with('user','categoryannoncereservation','city','annoncetype','periodeannonce','imagereservations')
            ->where('status',1)->latest()->get());

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationbyannoncetype(annoncetype $annoncetype)
    {
        $annonces = AnnoncereservationService::apiannoncereservationbyannoncetype($annoncetype);

        return response()->json($annonces, 200);
    }

    public function apiannoncereservationbycategoryannoncereservation(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation)
    {
        $annoncereservation = AnnoncereservationService::apiannoncereservationbycategoryannoncereservation($annoncetype,$categoryannoncereservation);

        return response()->json($annoncereservation, 200);
    }

    public function apiannoncereservationbycategoryannoncereservationcount(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation)
    {
        $annoncereservation = AnnoncereservationService::apiannoncereservationbycategoryannoncereservationcount($annoncetype,$categoryannoncereservation);
        return response()->json($annoncereservation, 200);
    }

    public function apiannoncereservationinteresse(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city)
    {
        $annoncereservation = AnnoncereservationService::apiannoncereservationinteresse($annoncetype,$categoryannoncereservation,$city);
        return response()->json($annoncereservation, 200);
    }

    public function apiannoncereservationinteresseslugin(categoryannoncereservation $categoryannoncereservation)
    {
        $annoncereservation = $categoryannoncereservation->annoncereservations()->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->with('user','city','annoncetype','categoryannoncereservation','imagereservations')
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(4)->distinct()->get()->toArray();
        return response()->json($annoncereservation, 200);
    }

    public function apiannoncereservationbycity(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city)
    {
        $annoncereservations= AnnoncereservationService::apiannoncereservationbycity($annoncetype,$categoryannoncereservation,$city);

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationbycitycount(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city)
    {
        $annoncereservations= AnnoncereservationService::apiannoncereservationbycitycount($annoncetype,$categoryannoncereservation,$city);

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationbyannoncetypebycity(annoncetype $annoncetype,city $city)
    {
        $annoncereservations= AnnoncereservationService::apiannoncereservationbyannoncetypebycity($annoncetype,$city);

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationbyannoncetypebycitycount(annoncetype $annoncetype,city $city)
    {
        $annoncereservations= AnnoncereservationService::apiannoncereservationbyannoncetypebycitycount($annoncetype,$city);

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationbycategorycount(categoryannoncereservation $categoryannoncereservation)
    {
        $annoncereservations = AnnoncereservationService::apiannoncereservationbycategorycount($categoryannoncereservation);

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationcategorybycitycount(categoryannoncereservation $categoryannoncereservation,city $city)
    {
        $annoncereservations = AnnoncereservationService::apiannoncereservationcategorybycitycount($categoryannoncereservation,$city);

        return response()->json($annoncereservations, 200);
    }

    public function apicitiesannonces()
    {
        $annoncereservations = CityResource::collection(city::with('user')
            ->where('status',1)
            ->withCount(['annoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce','imagereservations')
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('name','asc')->get());

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationbycategoryannoncereservationslug(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,annoncereservation $annoncereservation)
    {
        visits($annoncereservation)->seconds(60)->increment();

        $annoncereservation = new AnnoncereservationResource(annoncereservation::whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])
            ->whereSlug($annoncereservation->slug)->firstOrFail());

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
        $contactuser->user_id = $annoncereservation->user->id;
        $contactuser->annoncereservation_id = $annoncereservation->id;

        ContactuserService::newEmailToannoncereservationpageShow($request,$annoncereservation);

        $contactuser->save();

        return response()->json($contactuser,200);
    }

    public function apiannoncesreservationsbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){
            $data = AnnoncereservationService::apiannoncesreservationsbyuser($user);

            return response()->json($data, 200);
        }else{
            abort(404);
        }

    }

    public function annoncesreservationsbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.annonces.privateprofilannoncereservations',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }

    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(annoncetype $annoncetype)
    {
        return view('user.annoncereservation.create',[
            'annoncetype' => $annoncetype,
        ]);
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

    public function activated($id)
    {
        $annoncereservation = annoncereservation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$annoncereservation);

        if(auth()->user()->id === $annoncereservation->user_id){

            $annoncereservation->update(['status' => 1,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    public function unactivated($id)
    {
        $annoncereservation = annoncereservation::where('id', $id)->findOrFail($id);
        $this->authorize('update',$annoncereservation);

        if(auth()->user()->id === $annoncereservation->user_id){
            $annoncereservation->update(['status' => 0,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy(annoncetype $annoncetype,$id)
    {
        $annoncereservation = annoncereservation::findOrFail($id);
        $this->authorize('update',$annoncereservation);
        if (auth()->user()->id === $annoncereservation->user_id){
            $annoncereservation->delete();

            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }
    }
}
