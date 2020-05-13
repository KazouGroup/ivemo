<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncelocationResource;
use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PremiumblogannoncelocationController extends Controller
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

    public function index(user $user)
    {
        return view('premium.blog.blogannoncelocations.index',compact('user'));
    }

    public function create(user $user)
    {
        return view('premium.blog.blogannoncelocations.create',compact('user'));
    }

    public function category(user $user,$categoryannoncelocation)
    {
        //$blogannoncelocation = blogannoncelocation::whereSlug($categoryannoncelocation)->first();

        return view('premium.blog.blogannoncelocations.show',[
            'categoryannoncelocation' => $categoryannoncelocation,
        ]);
    }

    public function edit(user $user,$blogannoncelocation)
    {
        $blogannoncelocation = blogannoncelocation::whereSlugin($blogannoncelocation)->first();

        return view('premium.blog.blogannoncelocations.edit',[
            'blogannoncelocation' => $blogannoncelocation,
        ]);
    }


    public function data(user $user)
    {
        $blogannoncelocations = BlogannoncelocationResource::collection(blogannoncelocation::with('user','categoryannoncelocation','member')
            ->whereIn('user_id',[$user->id])->orderBy('created_at','DESC')->distinct()->get());

        return response()->json($blogannoncelocations,200);
    }

    public function datacount(user $user)
    {
        $blogannoncelocations = DB::table('blogannoncelocations')
            ->where(['status_admin' => 1])
           ->whereIn('user_id',[$user->id])->count();

        return response()->json($blogannoncelocations,200);
    }

    public function dataactivecount(user $user)
    {

        $blogannoncelocations =  DB::table('blogannoncelocations')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->count();

        return response()->json($blogannoncelocations,200);
    }

    public function dataunactivecount(user $user)
    {
        $blogannoncelocations =  DB::table('blogannoncelocations')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 0,'status_admin' => 1])
            ->count();

        return response()->json($blogannoncelocations,200);
    }

    public function datacategorycount(user $user, categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = DB::table('blogannoncelocations')
            ->where(['status_admin' => 1])
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])->count();

        return response()->json($blogannoncelocations,200);
    }

    public function datacategoryactivecount(user $user, categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations =  DB::table('blogannoncelocations')
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->count();

        return response()->json($blogannoncelocations,200);
    }


    public function datacategoryunactivecount(user $user, categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations =  DB::table('blogannoncelocations')
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->where(['status' => 0,'status_admin' => 1])
            ->count();

        return response()->json($blogannoncelocations,200);
    }
}
