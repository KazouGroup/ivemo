<?php

namespace App\Http\Controllers\Admin\Blogs;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncereservationResource;
use App\Model\blogannoncereservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class DashboardblogannoncereservationController extends Controller
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
        $blogannoncereservations = BlogannoncereservationResource::collection(blogannoncereservation::with('user','member','categoryannoncereservation')
            ->distinct()->paginate(10));

        return response()->json($blogannoncereservations,200);
    }

    public function blogannoncecount()
    {
        $blogannoncereservations = DB::table('blogannoncereservations')->count();

        return response()->json($blogannoncereservations,200);
    }

    public function blogannonceactivecount()
    {
        $blogannoncereservation = blogannoncereservation::where(['status' => 1,'status_admin' => 1])->get()->count();

        return response()->json($blogannoncereservation,200);
    }

    public function blogannonceunactivecount()
    {
        $blogannoncereservations = blogannoncereservation::where('status',0)->get()->count();

        return response()->json($blogannoncereservations,200);
    }

    public function index()
    {
        return view('admin.blog.blogannoncereservations.index');
    }

    public function activated($id)
    {
        $blogannoncereservation = blogannoncereservation::where('id', $id)->findOrFail($id);

        $blogannoncereservation->update([
            'status_admin' => 1,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $blogannoncereservation = blogannoncereservation::where('id', $id)->findOrFail($id);

        $blogannoncereservation->update([
            'status_admin' => 0,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }
}
