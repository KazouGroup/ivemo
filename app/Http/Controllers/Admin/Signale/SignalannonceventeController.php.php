<?php

namespace App\Http\Controllers\Admin\Signale;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnonceventeResource;
use App\Model\annoncevente;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SignalannonceventeController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function api()
    {

        $signalannoncelocations = AnnonceventeResource::collection(annoncevente::with('user','member')
            ->has('signalannonceventes', '>=' , 1)
            ->withCount(['signalannonceventes' => function ($q){
                $q->with('annoncevente');
            }])->orderBy('signalannonceventes_count','desc')
            ->distinct()->paginate(10));

        return response()->json($signalannoncelocations,200);
    }

    public function index()
    {
        return view('admin.signal.signalannonceventes.index');
    }


    public function show(annoncevente $annoncevente)
    {
        return view('admin.signal.signalannonceventes.show',['annoncevente' => $annoncevente]);
    }

    public function annoncevente(annoncevente $annoncevente)
    {
        $signalannoncelocation =  annoncevente::whereSlug($annoncevente->slug)
            ->withCount(['signalannonceventes' => function ($q){
                $q->with('annoncevente');
            }])
            ->with('user','categoryannoncevente','city','annoncetype')
            ->with(['signalannonceventes' => function ($q){
                $q->orderBy('created_at','DESC')->distinct()->get()->toArray();},
            ])->first();

        return response()->json($signalannoncelocation,200);
    }

    public function activated($id)
    {
        $annoncevente = annoncevente::where('id', $id)->findOrFail($id);

        $annoncevente->update([
            'status_admin' => 1,
            'member_id' => auth()->user()->id,
            ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $annoncevente = annoncevente::where('id', $id)->findOrFail($id);

        $annoncevente->update([
            'status_admin' => 0,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }
}
