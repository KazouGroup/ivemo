<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Annonces\Annoncevente\StoreRequest;
use App\Http\Requests\Annonces\Annoncevente\UpdateRequest;
use App\Http\Resources\AnnonceventeResource;
use App\Http\Resources\CategoryannonceventeResource;
use App\Http\Resources\CityResource;
use App\Models\annoncevente;
use App\Models\annoncetype;
use App\Models\categoryannoncevente;
use App\Models\city;
use App\Models\user;
use App\Services\AnnonceventeService;
use App\Services\Contactusers\ContactusersventeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AnnonceventeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['only' => [
            'create', 'store', 'edit', 'update', 'destroy','adminstatusitem',
            'apiannoncesventesbyuser','annoncesventesbyuser','annoncesventesbyusercategory',
            'apiannoncesventesbyusercategoryannoncevente', 'statusitem','statuscomments',
            'apiannonceventesbyannoncetypebyannoncevente',
        ]]);
    }

    public function api()
    {
        $annonceventes = AnnonceventeResource::collection(annoncevente::with('user', 'categoryannoncevente', 'city', 'annoncetype')->latest()->get());

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
        $annoncesventes = AnnonceventeResource::collection($annoncetype->annonceventes()
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncevente','city','annoncetype','uploadimages')
            ->with(['user.profile' => function ($q){$q->distinct()->get();}])
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
            ->where(['status' => 1,'status_admin' => 1])
            ->paginate(40));

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

    public function apiannonceventebycategoryannonceventecount(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente)
    {
        $annoncevente = AnnonceventeService::apiannonceventebycategoryannonceventecount($annoncetype,$categoryannoncevente);

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

    public function apiannonceventebycitycount(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city)
    {
        $annonceventecities = AnnonceventeService::apiannonceventebycitycount($annoncetype,$categoryannoncevente,$city);

        return response()->json($annonceventecities, 200);
    }

    public function apiannonceventesbyannoncetypebycitycount(annoncetype $annoncetype,city $city)
    {
        $annonceventecities = AnnonceventeService::apiannonceventesbyannoncetypebycitycount($annoncetype,$city);

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
                    ->with('user','categoryannoncevente','city','annoncetype','uploadimages')
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('name','asc')->get());

        return response()->json($annoncelocations, 200);
    }

    public function apiannonceventesbyannoncetypebyannoncevente(annoncetype $annoncetype,$annoncevente)
    {
        $data = AnnonceventeService::apiannonceventesbyannoncetypebyannoncevente($annoncetype,$annoncevente);

        return response()->json($data, 200);
    }

    /**
     * @param annoncetype $annoncetype
     * @param categoryannoncevente $categoryannoncevente
     * @param city $city
     * @param $date
     * @param $annoncevente
     * @return \Illuminate\Http\JsonResponse
     */

    public function apiannonceventebycategoryannonceventeslug(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$user,annoncevente $annoncevente)
    {
        visits($annoncevente)->seconds(10)->increment();

        $annoncevente = new AnnonceventeResource(annoncevente::whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','city','annoncetype','uploadimages','categoryannoncevente')
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->where(['status_admin' => 1])
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])
            ->whereSlug($annoncevente->slug)->firstOrFail());

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

    public function annonceventebycategoryannonceventeslug(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$user,annoncevente $annoncevente)
    {
        visits($annoncevente)->seconds(60)->increment();

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

    public function apiannonceventeinteresse(annoncetype $annoncetype,city $city)
    {
        $annoncevente = AnnonceventeResource::collection($city->annonceventes()
            ->whereIn('city_id',[$city->id])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','city','annoncetype','uploadimages','categoryannoncevente')
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','desc')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(10)->distinct()->get());
        return response()->json($annoncevente, 200);
    }

    public function apiannonceventeinteresseslug(categoryannoncevente $categoryannoncevente)
    {
        $annoncevente = AnnonceventeResource::collection($categoryannoncevente->annonceventes()
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->with('user','city','annoncetype','uploadimages','categoryannoncevente')
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(3)->distinct()->get());
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
                    ->whereIn('user_id',[auth()->user()->id])
                    ->where('status_admin',1);}])
            ->orderBy('annonceventes_count','desc')->distinct()->get());

        return response()->json($categoryannonceventes, 200);
    }

    public function apiannoncesventesbyusercategoryannoncevente(user $user,categoryannoncevente $categoryannoncevente)
    {
        if (auth()->user()->id === $user->id){
            $annonceventes = AnnonceventeService::apiannoncesventesbyusercategoryannoncevente($user,$categoryannoncevente);

            return response()->json($annonceventes, 200);
        }else{
            abort(404);
        }
    }

    public function apiannoncesventesbyuser(annoncetype $annoncetype)
    {
        $user = Auth::user();

        $this->authorize('update',$user);

        $annonceventes = AnnonceventeService::apiannoncesventesbyuser($user,$annoncetype);

        return response()->json($annonceventes, 200);
    }

    public function annoncesventesbyuser(user $user)
    {
        $user = Auth::user();

        $this->authorize('update',$user);

        return view('user.profile.annonces.privateprofilannonceventes',compact('user'));
    }

    public function annoncesventesbyusercategory(user $user,categoryannoncevente $categoryannoncevente)
    {
        return view('user.profile.annonces.privateprofilannonceventescategory',[
            'categoryannoncevente' => $categoryannoncevente,
        ]);
    }

    public function statusitem($id)
    {
        $annoncevente = annoncevente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$annoncevente);

        $annoncevente->update(['status' => !$annoncevente->status,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function statuscomments($id)
    {
        $annoncevente = annoncevente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$annoncevente);

        $annoncevente->update(['status_comments' => !$annoncevente->status_comments]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function adminstatusitem($id)
    {
        $annoncevente = annoncevente::where('id', $id)->findOrFail($id);

        $annoncevente->update(['status_admin' => !$annoncevente->status_admin,'member_id' => auth()->user()->id]);

        ContactusersventeService::adminsendMessageToUser($annoncevente);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    /**
     * @param annoncetype $annoncetype
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create(annoncetype $annoncetype)
    {
        return view('user.annoncevente.create',[
            'annoncetype' => $annoncetype,
        ]);
    }

    /**
     * @param StoreRequest $request
     * @param annoncetype $annoncetype
     * @return array
     */
    public function store(StoreRequest $request,annoncetype $annoncetype)
    {
        $annoncevente= new annoncevente();

        $annoncevente->fill($request->all());

        $annoncevente->annoncetype_id = $annoncetype->id;
        $annoncevente->description = clean($request->description);

        $annoncevente->save();

        AnnonceventeService::sendMessageToUser($request,$annoncetype);

        return ['redirect' => route('annonceventesedit_site',[$annoncetype->slug,$annoncevente->slugin])];
    }

    /**
     * @param annoncetype $annoncetype
     * @param annoncevente $annoncevente
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function edit(annoncetype $annoncetype,annoncevente $annoncevente)
    {
        return view('user.annoncevente.edit',[
            'annoncevente' => $annoncevente,
        ]);
    }

    /**
     * @param UpdateRequest $request
     * @param annoncetype $annoncetype
     * @param $annoncevente
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(UpdateRequest $request,annoncetype $annoncetype, $annoncevente)
    {
        $annoncevente = annoncevente::whereSlugin($annoncevente)->firstOrFail();

        $this->authorize('update',$annoncevente);

        $annoncevente->description = clean($request->description);
        $annoncevente->slug = null;
        $annoncevente->update($request->all());

        return response()->json($annoncevente,200);

    }

    /**
     * @param annoncetype $annoncetype
     * @param annoncevente $annoncevente
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(annoncetype $annoncetype,annoncevente $annoncevente)
    {

        $this->authorize('update',$annoncevente);

        $annoncevente->delete();

        return ['message' => 'message deleted '];
    }
}
