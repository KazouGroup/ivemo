<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Annonces\Annoncelocation\StoreRequest;
use App\Http\Requests\Annonces\Annoncelocation\UpdateRequest;
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
use App\Model\user;
use App\Services\AnnoncelocationService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
            'create','store','edit','update','destroy','apiannonceslocationsbyuser','annonceslocationsbyuser','apicategoryannoncelocations_by_user','activated','unactivated','apiannoncelocationsbyannoncetypebyannoncelocation'
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

    public function annoncelocationsbyannoncetypebycity(annoncetype $annoncetype,city $city)
    {
        return view('user.annoncelocation.annonces_by_city',[
            'annoncetype' => $annoncetype,
            'city' => $city,
        ]);
    }

    public function annoncelocationbycategoryannoncelocationslug(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,annoncelocation $annoncelocation)
    {
        visits($annoncelocation)->seconds(60)->increment();

        return view('user.annoncelocation.annonces_show',[
            'annoncelocation' => $annoncelocation,
        ]);
    }


    public function api()
    {
        $annoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user','categoryannoncelocation')->orderBy('created_at','desc')->get());

        return response()->json($annoncelocations, 200);
    }

    public function apicategoryannoncelocation()
    {
        $categoryannoncelocations = CategoryannoncelocationResource::collection(categoryannoncelocation::with('user')
            ->where('status',1)
            ->withCount(['annoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1]);
            }])
            ->orderBy('annoncelocations_count','desc')
            ->distinct()->get());

        return response()->json($categoryannoncelocations, 200);
    }

    public function apicategoryannoncelocationbycity(city $city)
    {
        $categoryannoncelocations = CategoryannoncelocationResource::collection(categoryannoncelocation::with('user')
            ->where('status',1)
            ->withCount(['annoncelocations' => function ($q) use ($city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('annoncelocations_count','desc')
            ->distinct()->get());

        return response()->json($categoryannoncelocations, 200);
    }

    public function apicategoryannoncelocations_by_user()
    {
        $categoryannoncelocations = CategoryannoncelocationResource::collection(categoryannoncelocation::with('user')
            ->where(['status' => 1])
            ->withCount(['annoncelocations' => function ($q){
                $q->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[auth()->user()->id]);
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[auth()->user()->id])->where('status_admin',1)
                    ->where('status_admin',1);
            }])->orderBy('annoncelocations_count','desc')
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

    public function apiannonceslocationsbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){

            $data = AnnoncelocationService::apiannonceslocationsbyuser($user);

            return response()->json($data, 200);

        }else{
            return abort(404);
        }

    }

    public function annonceslocationsbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.annonces.privateprofilannoncelocations',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }

    }

    public function apiannoncelocations()
    {
        $annoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user','categoryannoncelocation','city','annoncetype')
            ->where(['status' => 1,'status_admin' => 1])->latest()->get());

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocationbyannoncetype(annoncetype $annoncetype)
    {
        $annonceslocations = AnnoncelocationResource::collection($annoncetype->annoncelocations()
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncelocation','city','annoncetype')
            ->with(['user.profile' => function ($q){$q->distinct()->get();}])
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->where(['status' => 1,'status_admin' => 1])
            ->orderBy('created_at','desc')->paginate(40));

        return response()->json($annonceslocations, 200);
    }

    public function apiannoncelocationbycategoryannoncelocationcount(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation)
    {
        $annoncelocation = AnnoncelocationService::apiannoncelocationbycategoryannoncelocationcount($annoncetype,$categoryannoncelocation);

        return response()->json($annoncelocation, 200);
    }

    public function apiannoncelocationbycategoryannoncelocation(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation)
    {
        $annoncelocation = AnnoncelocationService::apiannoncelocationbycategoryannoncelocation($annoncetype,$categoryannoncelocation);

        return response()->json($annoncelocation, 200);
    }

    public function apiannoncelocationbycitycount(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city)
    {
        $annoncelocations = AnnoncelocationService::apiannoncelocationbycitycount($annoncetype,$categoryannoncelocation,$city);

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocationbycity(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city)
    {
        $annoncelocations = AnnoncelocationService::apiannoncelocationbycity($annoncetype,$categoryannoncelocation,$city);

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocationsbyannoncetypebycitycount(annoncetype $annoncetype,city $city)
    {
        $annoncelocations = AnnoncelocationService::apiannoncelocationsbyannoncetypebycitycount($annoncetype,$city);

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocationsbyannoncetypebycity(annoncetype $annoncetype,city $city)
    {
        $annoncelocations = AnnoncelocationService::apiannoncelocationsbyannoncetypebycity($annoncetype,$city);

        return response()->json($annoncelocations, 200);
    }

    public function apicitiesannonces()
    {
        $annoncelocations = CityResource::collection(city::with('user')
            ->where('status',1)
            ->withCount(['annoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncelocation','city','annoncetype')
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('name','asc')->get());

        return response()->json($annoncelocations, 200);
    }


    public function apiannoncelocationbycategoryannoncelocationslug(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,annoncelocation $annoncelocation)
    {
        visits($annoncelocation)->seconds(60)->increment();

        $annoncelocation = AnnoncelocationService::apiannoncelocationbycategoryannoncelocationslug($annoncetype,$categoryannoncelocation,$city,$annoncelocation);

        return response()->json($annoncelocation, 200);
    }

    public function apiannoncelocationinteressebycategoryannoncelocation(categoryannoncelocation $categoryannoncelocation)
    {
        $annoncelocations = annoncelocation::with('user','city','annoncetype','categoryannoncelocation')
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->WhereHas('city', function ($q) {$q->where('status',1);})
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(10)->distinct()->get()->toArray();

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocationinteressebycity(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city)
    {
        $annoncelocation = $categoryannoncelocation->annoncelocations()
            ->with('user','city','annoncetype','categoryannoncelocation')
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->whereIn('city_id',[$city->id])
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(10)->distinct()->get()->toArray();

        return response()->json($annoncelocation, 200);
    }

    public function apiannoncelocationinteresseslug(categoryannoncelocation $categoryannoncelocation)
    {
        $annoncelocation = $categoryannoncelocation->annoncelocations()->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
        ->with('user','city','annoncetype','categoryannoncelocation')
        ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
        ->whereHas('city', function ($q) {$q->where('status',1);})
        ->orderByRaw('RAND()')
        ->where(['status' => 1,'status_admin' => 1])
        ->take(4)->distinct()->get()->toArray();
        return response()->json($annoncelocation, 200);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(annoncetype $annoncetype)
    {
        return view('user.annoncelocation.create',[
            'annoncetype' => $annoncetype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request,annoncetype $annoncetype)
    {
        $annoncelocation= new annoncelocation();

        $annoncelocation->fill($request->all());

        $annoncelocation->annoncetype_id = $annoncetype->id;
        $annoncelocation->description = clean($request->description);

        $annoncelocation->save();

        return response('Created',Response::HTTP_CREATED);
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

    public function apiannoncelocationsbyannoncetypebyannoncelocation(annoncetype $annoncetype,$annoncelocation)
    {
        $data = AnnoncelocationService::apiannoncelocationsbyannoncetypebyannoncelocation($annoncetype,$annoncelocation);

        return response()->json($data, 200);
    }


    public function edit(annoncetype $annoncetype,annoncelocation $annoncelocation)
    {
        return view('user.annoncelocation.edit',[
            'annoncelocation' => $annoncelocation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request,annoncetype $annoncetype,$annoncelocation)
    {
        $annoncelocation = annoncelocation::whereSlugin($annoncelocation)->firstOrFail();

        $this->authorize('update',$annoncelocation);


        $annoncelocation->description = clean($request->description);
        $annoncelocation->slug = null;
        $annoncelocation->update($request->all());

        return response()->json($annoncelocation,200);
    }


    public function activated($id)
    {
        $annoncelocation = annoncelocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$annoncelocation);

        if(auth()->user()->id === $annoncelocation->user_id){

            $annoncelocation->update(['status' => 1,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    public function unactivated($id)
    {
        $annoncelocation = annoncelocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$annoncelocation);

        if(auth()->user()->id === $annoncelocation->user_id){
            $annoncelocation->update(['status' => 0,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    public function adminactivated($id)
    {
        $annoncelocation = annoncelocation::where('id', $id)->findOrFail($id);

        $annoncelocation->update(['status_admin' => 1,'member_id' => auth()->user()->id]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function adminunactivated($id)
    {
        $annoncelocation = annoncelocation::where('id', $id)->findOrFail($id);

        $annoncelocation->update(['status_admin' => 0,'member_id' => auth()->user()->id]);

        return response('Confirmed',Response::HTTP_ACCEPTED);

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
        $this->authorize('update',$annoncelocation);
        if (auth()->user()->id === $annoncelocation->user_id){
            $annoncelocation->delete();
            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }
    }
}
