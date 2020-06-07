<?php

namespace App\Http\Controllers\Admin\Blogs;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncelocationResource;
use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class DashboardblogannoncelocationController extends Controller
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
        $blogannoncelocations = BlogannoncelocationResource::collection(blogannoncelocation::with('user','member','categoryannoncelocation')
            ->orderBy('created_at','DESC')->distinct()->paginate(10));

        return response()->json($blogannoncelocations,200);
    }

    public function categoryannoncelocation(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = categoryannoncelocation::whereSlug($categoryannoncelocation->slug)
            ->withCount(['blogannoncelocations' => function ($q)  use ($categoryannoncelocation){
                $q->with('user','member','categoryannoncelocation')
                    ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id]);
            }])->with(['blogannoncelocations' => function ($q) use ($categoryannoncelocation){
                $q->with('user','member','categoryannoncelocation')
                    ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                    ->orderBy('created_at','DESC')->distinct()->get();},
            ])->first();

        return response()->json($blogannoncelocations, 200);
    }

    public function blogannoncecount()
    {
        $blogannoncelocations = DB::table('blogannonceventes')->count();

        return response()->json($blogannoncelocations,200);
    }

    public function blogannoncebycategorycount(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = blogannoncelocation::whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])->get()->count();

        return response()->json($blogannoncelocations,200);
    }

    public function blogannonceactivecount()
    {
        $blogannoncelocations = blogannoncelocation::where(['status' => 1])->get()->count();

        return response()->json($blogannoncelocations,200);
    }

    public function blogannonceactivebycategorycount(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = blogannoncelocation::whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->where(['status' => 1])->get()->count();

        return response()->json($blogannoncelocations,200);
    }

    public function  blogannonceunactivecount()
    {
        $blogannoncelocations = blogannoncelocation::where(['status' => 0])->get()->count();

        return response()->json($blogannoncelocations,200);
    }

    public function blogannonceunactivebycategorycount(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = blogannoncelocation::where(['status' => 0])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->get()->count();

        return response()->json($blogannoncelocations,200);
    }

    public function index()
    {
        return view('admin.blog.blogannoncelocations.index');
    }

    public function show(categoryannoncelocation $categoryannoncelocation)
    {
        return view('admin.blog.blogannoncelocations.show',[
            'categoryannoncelocation' => $categoryannoncelocation,
        ]);
    }

    public function activated($id)
    {
        $blogannoncelocation = blogannoncelocation::where('id', $id)->findOrFail($id);

        $blogannoncelocation->update([
            'status_admin' => 1,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $blogannoncelocation = blogannoncelocation::where('id', $id)->findOrFail($id);

        $blogannoncelocation->update([
            'status_admin' => 0,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }
}
