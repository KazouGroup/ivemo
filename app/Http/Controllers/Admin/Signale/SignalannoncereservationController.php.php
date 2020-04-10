<?php

namespace App\Http\Controllers\Admin\Signale;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnoncereservationResource;
use App\Http\Resources\AnnonceventeResource;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SignalannoncereservationController extends Controller
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

        $signalannoncereservations = AnnoncereservationResource::collection(annoncereservation::with('user','member')
            ->has('signalannoncereservations', '>=' , 1)
            ->withCount(['signalannoncereservations' => function ($q){
                $q->with('annoncereservation');
            }])->orderBy('signalannoncereservations_count','desc')
            ->distinct()->paginate(10));

        return response()->json($signalannoncereservations,200);
    }

    public function index()
    {
        return view('admin.signal.signalannoncereservations.index');
    }


    public function show(annoncereservation $annoncereservation)
    {
        return view('admin.signal.signalannoncereservations.show',['annoncereservation' => $annoncereservation]);
    }

    public function annoncereservation(annoncereservation $annoncereservation)
    {
        $signalannoncereservation =  annoncereservation::whereSlug($annoncereservation->slug)
            ->withCount(['signalannoncereservations' => function ($q){
                $q->with('annoncereservation');
            }])->with('user','member','categoryannoncereservation','city','annoncetype')
            ->with(['signalannoncereservations' => function ($q){
                $q->orderBy('created_at','DESC')->distinct()->get()->toArray();},
            ])->first();

        return response()->json($signalannoncereservation,200);
    }

    public function activated($id)
    {
        $annoncereservation = annoncereservation::where('id', $id)->findOrFail($id);

        $annoncereservation->update([
            'status_admin' => 1,
            'member_id' => auth()->user()->id,
            ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $annoncereservation = annoncevente::where('id', $id)->findOrFail($id);

        $annoncereservation->update([
            'status_admin' => 0,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }
}
