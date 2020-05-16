<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncereservationResource;
use App\Model\blogannoncereservation;
use App\Model\categoryannoncereservation;
use App\Model\user;
use Illuminate\Support\Facades\DB;

class PremiumblogannoncereservationController extends Controller
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
        $this->authorize('update',$user);

        return view('premium.blog.blogannoncereservations.index',compact('user'));
    }

    public function create(user $user)
    {
        $this->authorize('update',$user);

        return view('premium.blog.blogannoncereservations.create',compact('user'));
    }

    public function category(user $user,$categoryannoncereservation)
    {
        return view('premium.blog.blogannoncereservations.show',[
            'categoryannoncereservation' => $categoryannoncereservation,
        ]);
    }

    public function edit(user $user,$blogannoncereservation)
    {
        $this->authorize('update',$user);

        $blogannoncereservation = blogannoncereservation::whereSlugin($blogannoncereservation)->first();

        return view('premium.blog.blogannoncelocations.edit',[
            'blogannoncereservations' => $blogannoncereservation,
        ]);
    }


    public function data(user $user)
    {
        $this->authorize('update',$user);

        $blogannoncereservations = BlogannoncereservationResource::collection(blogannoncereservation::with('user','categoryannoncereservation')
            ->whereIn('user_id',[$user->id])
            ->orderBy('created_at','DESC')
            ->distinct()->get()->toArray());

        return response()->json($blogannoncereservations,200);
    }

    public function datacount(user $user)
    {
        $this->authorize('update',$user);

        $blogannoncereservations = DB::table('blogannoncereservations')
           ->whereIn('user_id',[$user->id])->count();

        return response()->json($blogannoncereservations,200);
    }

    public function dataactivecount(user $user)
    {
        $this->authorize('update',$user);

        $blogannoncereservations =  DB::table('blogannoncereservations')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 1])
            ->count();

        return response()->json($blogannoncereservations,200);
    }

    public function dataunactivecount(user $user)
    {
        $this->authorize('update',$user);

        $blogannoncereservations =  DB::table('blogannoncereservations')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 0])
            ->count();

        return response()->json($blogannoncereservations,200);
    }

    public function datacategorycount(user $user, categoryannoncereservation $categoryannoncereservation)
    {
        $this->authorize('update',$user);

        $blogannoncereservations = DB::table('blogannoncereservations')
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])->count();

        return response()->json($blogannoncereservations,200);
    }

    public function datacategoryactivecount(user $user, categoryannoncereservation $categoryannoncereservation)
    {
        $this->authorize('update',$user);

        $blogannoncereservations =  DB::table('blogannoncereservations')
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->where(['status' => 1])
            ->count();

        return response()->json($blogannoncereservations,200);
    }


    public function datacategoryunactivecount(user $user, categoryannoncereservation $categoryannoncereservation)
    {
        $this->authorize('update',$user);

        $blogannoncereservations =  DB::table('blogannoncelocations')
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->where(['status' => 0])
            ->count();

        return response()->json($blogannoncereservations,200);
    }
}
