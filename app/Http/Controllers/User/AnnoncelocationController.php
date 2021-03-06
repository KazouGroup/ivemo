<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Annonces\Annoncelocation\StoreRequest;
use App\Http\Requests\Annonces\Annoncelocation\UpdateRequest;
use App\Http\Resources\AnnoncelocationResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Http\Resources\CityResource;
use App\Models\annoncelocation;
use App\Models\annoncetype;
use App\Models\categoryannoncelocation;
use App\Models\city;
use App\Models\user;
use App\Services\AnnoncelocationService;
use App\Services\Contactusers\ContactuserslocationService;
use Illuminate\Support\Facades\Auth;
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
            'create','store','edit','update','destroy',
            'apiannonceslocationsbyuser','annonceslocationsbyuser',
            'apicategoryannoncelocations_by_user',
            'statusitem','adminstatusitem','activecomments','desactivecomments',
            'apiannoncelocationsbyannoncetypebyannoncelocation'
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

    public function annoncelocationbycategoryannoncelocationslug(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$user,annoncelocation $annoncelocation)
    {
        visits($annoncelocation)->seconds(10)->increment();

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

    public function apiannonceslocationsbyuser(annoncetype $annoncetype)
    {
        $user = Auth::user();

        $this->authorize('update',$user);

        $data = AnnoncelocationService::apiannonceslocationsbyuser($user,$annoncetype);

        return response()->json($data, 200);

    }

    public function annonceslocationsbyuser()
    {
        $user = Auth::user();

        $this->authorize('update',$user);

        return view('user.profile.annonces.privateprofilannoncelocations',compact('user'));

    }

    public function apiannoncelocations()
    {
        $annoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user','categoryannoncelocation','city','periodeannonce','annoncetype','uploadimages')
            ->where(['status' => 1,'status_admin' => 1])->latest()->get());

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocationbyannoncetype(annoncetype $annoncetype)
    {
        $annonceslocations = AnnoncelocationResource::collection($annoncetype->annoncelocations()
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncelocation','city','periodeannonce','annoncetype','uploadimages')
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
                    ->with('user','categoryannoncelocation','city','annoncetype','periodeannonce','uploadimages')
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('name','asc')->get());

        return response()->json($annoncelocations, 200);
    }

    /**
     * @param annoncetype $annoncetype
     * @param categoryannoncelocation $categoryannoncelocation
     * @param city $city
     * @param annoncelocation $annoncelocation
     * @return \Illuminate\Http\JsonResponse
     */
    public function apiannoncelocationbycategoryannoncelocationslug(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$user,annoncelocation $annoncelocation)
    {
        visits($annoncelocation)->seconds(10)->increment();

        $annoncelocation = AnnoncelocationService::apiannoncelocationbycategoryannoncelocationslug($annoncetype,$categoryannoncelocation,$city,$user,$annoncelocation);

        return response()->json($annoncelocation, 200);
    }

    /**
     * @param categoryannoncelocation $categoryannoncelocation
     * @return \Illuminate\Http\JsonResponse
     */
    public function apiannoncelocationinteressebycategoryannoncelocation(categoryannoncelocation $categoryannoncelocation)
    {
        $annoncelocations = annoncelocation::with('user','city','annoncetype','periodeannonce','categoryannoncelocation','uploadimages')
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->WhereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','desc')
            //->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(10)->distinct()->get()->toArray();

        return response()->json($annoncelocations, 200);
    }

    /**
     * @param annoncetype $annoncetype
     * @param categoryannoncelocation $categoryannoncelocation
     * @param user $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function apiannoncelocationinteressebyuser(annoncetype $annoncetype,user $user)
    {
        $annoncelocations = AnnoncelocationResource::collection($user->annoncelocations()
            ->with('user','city','annoncetype','periodeannonce','categoryannoncelocation','uploadimages')
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('user_id',[$user->id])
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','desc')
            //->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(20)->distinct()->get());

        return response()->json($annoncelocations, 200);
    }

    public function apiannoncelocationinteresseslug(categoryannoncelocation $categoryannoncelocation)
    {
        $annoncelocation = $categoryannoncelocation->annoncelocations()
        ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
        ->with('user','city','annoncetype','periodeannonce','categoryannoncelocation','uploadimages')
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
     * @return array|\Illuminate\Http\Response
     */
    public function store(StoreRequest $request,annoncetype $annoncetype)
    {
        $annoncelocation = new annoncelocation();

        $annoncelocation->fill($request->all());

        $annoncelocation->annoncetype_id = $annoncetype->id;
        $annoncelocation->description = clean($request->description);

        $annoncelocation->save();

        AnnoncelocationService::sendMessageToUser($request,$annoncetype);

        return ['redirect' => route('annoncelocationsedit_site',[$annoncetype->slug,$annoncelocation->slugin])];
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
     * @param UpdateRequest $request
     * @param annoncetype $annoncetype
     * @param $annoncelocation
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
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

    public function activecomments($annoncelocation)
    {
        $annoncelocation = annoncelocation::where('id', $annoncelocation)->findOrFail($annoncelocation);

        $this->authorize('update',$annoncelocation);

        $annoncelocation->update(['status_comments' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function desactivecomments($annoncelocation)
    {
        $annoncelocation = annoncelocation::where('id', $annoncelocation)->findOrFail($annoncelocation);

        $this->authorize('update',$annoncelocation);

        $annoncelocation->update(['status_comments' => 0,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function statusitem($id)
    {
        $annoncelocation = annoncelocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$annoncelocation);

        $annoncelocation->update(['status' => !$annoncelocation->status,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }


    public function adminactivated($id)
    {
        $annoncelocation = annoncelocation::where('id', $id)->findOrFail($id);

        $annoncelocation->update(['status_admin' => !$annoncelocation->status_admin,'member_id' => auth()->user()->id]);

        ContactuserslocationService::adminsendMessageToUser($annoncelocation);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }


    /**
     * @param annoncetype $annoncetype
     * @param $id
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
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
