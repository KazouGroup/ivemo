<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnonceventeResource;
use App\Http\Resources\CategoryannonceventeResource;
use App\Http\Resources\CityResource;
use App\Model\annoncevente;
use App\Model\annoncetype;
use App\Model\categoryannoncevente;
use App\Model\city;
use App\Model\user;
use App\Services\AnnonceventeService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AnnonceventeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['only' => [
            'create', 'store', 'edit', 'update', 'destroy','apiannoncesventesbyuser','annoncesventesbyuser',
            'activated', 'unactivated'
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
        $categoryannonceventes = CategoryannonceventeResource::collection(categoryannoncevente::with('user')->where(['status' => 1])
            ->withCount(['annonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->withCount(['blogannonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);});
            }])->orderBy('annonceventes_count','desc')
            ->distinct()->get());

        return response()->json($categoryannonceventes, 200);

    }

    public function apicategoryannonceventebycity(city $city)
    {
        $categoryannonceventes = CategoryannonceventeResource::collection(categoryannoncevente::with('user')
            ->where(['status' => 1])
            ->withCount(['annonceventes' => function ($q) use ($city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->orderBy('annonceventes_count','desc')
            ->distinct()->get());

        return response()->json($categoryannonceventes, 200);

    }


    public function apiannonceventebyannoncetype(annoncetype $annoncetype)
    {
        $annoncesventes = $annoncetype->annonceventes()->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncevente','city','annoncetype')
            ->with(['user.profile' => function ($q){$q->distinct()->get();}])
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
            ->where(['status' => 1,'status_admin' => 1])
            ->distinct()->paginate(40)->toArray();

        return response()->json($annoncesventes, 200);
    }

    /**
     * @param annoncetype $annoncetype
     * @param categoryannoncevente $categoryannoncevente
     * @return \Illuminate\Http\JsonResponse
     *
     */

    public function apiannonceventebycategoryannoncevente(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente)
    {
        $annoncevente = AnnonceventeService::apiannonceventebycategoryannoncevente($annoncetype,$categoryannoncevente);

        return response()->json($annoncevente, 200);
    }

    /**
     * @param annoncetype $annoncetype
     * @param categoryannoncevente $categoryannoncevente
     * @param city $city
     * @return \Illuminate\Http\JsonResponse
     *
     */

    public function apiannonceventebycity(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city)
    {
        $annonceventecities = AnnonceventeService::apiannonceventebycity($annoncetype,$categoryannoncevente,$city);

        return response()->json($annonceventecities, 200);
    }

    public function apiannonceventesbyannoncetypebycity(annoncetype $annoncetype,city $city)
    {
        $annonceventecities = AnnonceventeService::apiannonceventesbyannoncetypebycity($annoncetype,$city);

        return response()->json($annonceventecities, 200);
    }

    public function apicitiesannonces()
    {
        $annoncelocations = CityResource::collection(city::with('user')
            ->where('status',1)
            ->withCount(['annonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente','city','annoncetype')
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('name','asc')->get());

        return response()->json($annoncelocations, 200);
    }

    /**
     * @param annoncetype $annoncetype
     * @param categoryannoncevente $categoryannoncevente
     * @param city $city
     * @param $date
     * @param $annoncevente
     * @return \Illuminate\Http\JsonResponse
     */

    public function apiannonceventebycategoryannonceventeslug(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$annoncevente)
    {
        $annoncevente = new AnnonceventeResource(annoncevente::whereIn('annoncetype_id',[$annoncetype->id])
        ->whereIn('city_id',[$city->id])
        ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
        ->where(['status' => 1,'status_admin' => 1])
        ->with(['user.profile' => function ($q){$q->distinct()->get();},])
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

    public function annonceventebycategoryannoncevente(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente)
    {
        return view('user.annoncevente.annonces_category',[
            'annoncestype' => $annoncetype,
            'categoryannoncevente' => $categoryannoncevente,
        ]);
    }

    public function annonceventebycity(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city)
    {
        return view('user.annoncevente.annonces_city',[
            'annoncetype' => $annoncetype,
            'categoryannoncevente' => $categoryannoncevente,
            'city' => $city,
        ]);
    }

    public function annonceventesbyannoncetypebycity(annoncetype $annoncetype,city $city)
    {
        return view('user.annoncevente.annonces_by_city',[
            'annoncetype' => $annoncetype,
            'city' => $city,
        ]);
    }

    public function annonceventebycategoryannonceventeslug(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,annoncevente $annoncevente)
    {
        return view('user.annoncevente.annonces_show',[
            'categoryannoncevente' => $categoryannoncevente,
            'annoncevente' => $annoncevente,
        ]);
    }

    public function apiannonceventebycategorycount(categoryannoncevente $categoryannoncevente )
    {
        $annoncesbycategoriescities = AnnonceventeService::apiannonceventebycategorycount($categoryannoncevente);

        return response()->json($annoncesbycategoriescities, 200);
    }

    public function apiannonceventecategorybycitycount(categoryannoncevente $categoryannoncevente,city $city )
    {
        $data = AnnonceventeService::apiannonceventecategorybycitycount($categoryannoncevente,$city);

        return response()->json($data, 200);
    }

    public function apiannonceventeinteresse(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city)
    {
        $annoncevente = $categoryannoncevente->annonceventes()->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','city','annoncetype','categoryannoncevente')
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->whereIn('city_id',[$city->id])
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(10)->distinct()->get()->toArray();
        return response()->json($annoncevente, 200);
    }

    public function apiannonceventeinteresseslug(categoryannoncevente $categoryannoncevente)
    {
        $annoncevente = $categoryannoncevente->annonceventes()
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->with('user','city','annoncetype','categoryannoncevente')
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(3)->distinct()->get()->toArray();
        return response()->json($annoncevente, 200);
    }

    public function apicategoryannonceventes_by_user()
    {
        $categoryannonceventes = CategoryannonceventeResource::collection(categoryannoncevente::with('user')
            ->where(['status' => 1])
            ->withCount(['annonceventes' => function ($q){
                $q->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[auth()->user()->id]);
            }])->withCount(['blogannonceventes' => function ($q){
                $q->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[auth()->user()->id]);}])
            ->orderBy('annonceventes_count','desc')->distinct()->get());

        return response()->json($categoryannonceventes, 200);
    }

    public function apiannoncesventesbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){
            $annonceventes = AnnonceventeService::apiannoncesventesbyuser($user);

            return response()->json($annonceventes, 200);
        }else{
            abort(404);
        }
    }

    public function annoncesventesbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.annonces.privateprofilannonceventes',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }

    }

    public function activated($id)
    {
        $annoncevente = annoncevente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$annoncevente);

        if(auth()->user()->id === $annoncevente->user_id){

            $annoncevente->update(['status' => 1,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    public function unactivated($id)
    {
        $annoncevente = annoncevente::where('id', $id)->findOrFail($id);
        $this->authorize('update',$annoncevente);

        if(auth()->user()->id === $annoncevente->user_id){
            $annoncevente->update(['status' => 0,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
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
