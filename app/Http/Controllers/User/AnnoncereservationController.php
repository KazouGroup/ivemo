<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Annonces\Annoncereservation\StoreRequest;
use App\Http\Requests\Annonces\Annoncereservation\UpdateRequest;
use App\Http\Requests\Contactuser\StorecontactRequest;
use App\Http\Resources\AnnoncereservationResource;
use App\Http\Resources\AnnoncetypeResource;
use App\Http\Resources\CategoryannoncereservationResource;
use App\Http\Resources\CityResource;
use App\Models\annoncereservation;
use App\Models\annoncetype;
use App\Models\categoryannoncereservation;
use App\Models\user;
use App\Services\AnnoncereservationService;
use App\Models\contactuser;
use App\Models\city;
use App\Models\reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AnnoncereservationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','statusitem',
            'destroy','statuscomments',
            'annoncesreservationsbyuser',
            'apiannoncesreservationsbyuser',
            'apicategoryannoncereservations_by_user',
            'apiannoncereservationsbyannoncetypebyannoncereservation'
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

    public function annoncereservationbycategoryannoncereservation(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation)
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

    public function annoncereservationbycategoryannoncereservationslug(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation)
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
              $q->statuspublished();
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
              $q->statuspublished()->whereIn('city_id',[$city->id]);
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

    public function apiannoncereservationinteresse(annoncetype $annoncetype,user $user)
    {
        $annoncereservation = AnnoncereservationService::apiannoncereservationinteresse($annoncetype,$user);
        return response()->json($annoncereservation, 200);
    }

    public function apiannoncereservationinteresseslugin(categoryannoncereservation $categoryannoncereservation)
    {
        $annoncereservation = AnnoncereservationResource::collection($categoryannoncereservation->annoncereservations()->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->with('user','city','annoncetype','periodeannonce','categoryannoncereservation')
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','desc')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(4)->distinct()->get());
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
                    ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce','uploadimages')
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('name','asc')->get());

        return response()->json($annoncereservations, 200);
    }

    public function apiannoncereservationbycategoryannoncereservationslug(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation)
    {
        visits($annoncereservation)->seconds(60)->increment();

        $annoncereservation = new AnnoncereservationResource(annoncereservation::whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->where(['status_admin' => 1])
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])
            ->whereSlug($annoncereservation->slug)->firstOrFail());

        return response()->json($annoncereservation, 200);
    }


     public function sendcontactmessageuser(StorecontactRequest $request, annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation)
    {

        $contactuser = new contactuser();

        $slug = sha1(('YmdHis') . str_random(30));
        $contactuser->fill($request->all());
        $contactuser->slug = $slug;
        //$contactuser->user_id = $annoncereservation->user->id;
        //$contactuser->annoncereservation_id = $annoncereservation->id;

        //ContactuserService::newEmailToannoncereservationpageShow($request,$annoncereservation);

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
     * @return array|\Illuminate\Http\Response
     */
    public function store(StoreRequest $request,annoncetype $annoncetype)
    {
        $annoncereservation = new annoncereservation();

        $annoncereservation->fill($request->all());

        $annoncereservation->annoncetype_id = $annoncetype->id;
        $annoncereservation->description = clean($request->description);

        $annoncereservation->save();

        AnnoncereservationService::sendMessageToUser($request,$annoncetype);

        return ['redirect' => route('annoncereservationsedit_site',[$annoncetype->slug,$annoncereservation->slugin])];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(annoncetype $annoncetype,$annoncereservation)
    {
        $data = AnnoncereservationService::show($annoncetype,$annoncereservation);

        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(annoncetype $annoncetype,annoncereservation $annoncereservation)
    {
        return view('user.annoncereservation.edit',[
            'annoncereservation' => $annoncereservation,
        ]);
    }

    /**
     * @param UpdateRequest $request
     * @param annoncetype $annoncetype
     * @param annoncereservation $annoncereservation
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(UpdateRequest $request,annoncetype $annoncetype,annoncereservation $annoncereservation)
    {

        $this->authorize('update',$annoncereservation);


        $annoncereservation->description = clean($request->description);
        $annoncereservation->slug = null;
        $annoncereservation->update($request->all());

        return response()->json($annoncereservation,200);
    }

    public function statusitem(annoncereservation $annoncereservation)
    {
        $this->authorize('update',$annoncereservation);

        $annoncereservation->update(['status' => !$annoncereservation->status]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function statuscomments(annoncereservation $annoncereservation)
    {
        $this->authorize('update',$annoncereservation);

        $annoncereservation->update(['status_comments' => !$annoncereservation->status_comments]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    /**
     * @param annoncetype $annoncetype
     * @param annoncereservation $annoncereservation
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(annoncetype $annoncetype,annoncereservation $annoncereservation)
    {
        $this->authorize('update',$annoncereservation);

        $annoncereservation->delete();

        return ['message' => 'message deleted '];
    }
}
