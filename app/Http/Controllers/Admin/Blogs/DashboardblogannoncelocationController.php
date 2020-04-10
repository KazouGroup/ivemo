<?php

namespace App\Http\Controllers\Admin\Blogs;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncelocationResource;
use App\Model\blogannoncelocation;
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
            ->distinct()->paginate(10));

        return response()->json($blogannoncelocations,200);
    }

    public function blogannoncecount()
    {
        $blogannoncelocations = DB::table('blogannonceventes')->count();

        return response()->json($blogannoncelocations,200);
    }

    public function blogannonceactivecount()
    {
        $blogannoncelocations = blogannoncelocation::where(['status' => 1,'status_admin' => 1])->get()->count();

        return response()->json($blogannoncelocations,200);
    }

    public function blogannonceunactivecount()
    {
        $blogannoncelocations = blogannoncelocation::where('status',0)->get()->count();

        return response()->json($blogannoncelocations,200);
    }

    public function index()
    {
        return view('admin.blog.blogannoncelocations.index');
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
