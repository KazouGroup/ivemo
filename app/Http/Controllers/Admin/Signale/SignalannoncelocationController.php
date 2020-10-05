<?php

namespace App\Http\Controllers\Admin\Signale;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnoncelocationResource;
use App\Models\annoncelocation;
use Symfony\Component\HttpFoundation\Response;

class SignalannoncelocationController extends Controller
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

        $signalannoncelocations = AnnoncelocationResource::collection(annoncelocation::with('user')
            ->has('signalannoncelocations', '>=' , 1)
            ->withCount(['signalannoncelocations' => function ($q){
                $q->with('annoncelocation');
            }])->orderBy('signalannoncelocations_count','desc')
            ->distinct()->paginate(10));

        return response()->json($signalannoncelocations,200);
    }

    public function index()
    {
        return view('admin.signal.signalannoncelocations.index');
    }


    public function show(annoncelocation $annoncelocation)
    {
        return view('admin.signal.signalannoncelocations.show',['annoncelocation' => $annoncelocation]);
    }

    public function annoncelocation(annoncelocation $annoncelocation)
    {
        $signalannoncelocation =  annoncelocation::whereSlug($annoncelocation->slug)
            ->withCount(['signalannoncelocations' => function ($q){
                $q->with('annoncelocation');
            }])
            ->with('user','member','categoryannoncelocation','city','annoncetype')
            ->with(['signalannoncelocations' => function ($q){
                $q->orderBy('created_at','DESC')->distinct()->get()->toArray();},
            ])->first();

        return response()->json($signalannoncelocation,200);
    }

    public function activated($id)
    {
        $annoncelocation = annoncelocation::where('id', $id)->findOrFail($id);

        $annoncelocation->update([
            'status_admin' => 1,
            'member_id' => auth()->user()->id,
            ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $annoncelocation = annoncelocation::where('id', $id)->findOrFail($id);

        $annoncelocation->update([
            'status_admin' => 0,
            'member_id' => auth()->user()->id,
            ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }
}
