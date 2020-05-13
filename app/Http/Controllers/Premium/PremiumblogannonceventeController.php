<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncelocationResource;
use App\Http\Resources\BlogannonceventeResource;
use App\Model\blogannoncelocation;
use App\Model\blogannoncevente;
use App\Model\categoryannoncelocation;
use App\Model\categoryannoncevente;
use App\Model\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PremiumblogannonceventeController extends Controller
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
        return view('premium.blog.blogannonceventes.index',compact('user'));
    }

    public function create(user $user)
    {
        return view('premium.blog.blogannonceventes.index',compact('user'));
    }

    public function category(user $user,categoryannoncevente $categoryannoncevente)
    {
        return view('premium.blog.blogannonceventes.show',[
            'categoryannoncevente' => $categoryannoncevente,
        ]);
    }

    public function edit(user $user,$blogannoncevente)
    {
        $blogannoncevente = blogannoncevente::whereSlugin($blogannoncevente)->first();

        return view('premium.blog.blogannonceventes.edit',[
            'blogannoncevente' => $blogannoncevente,
        ]);
    }


    public function data(user $user)
    {

        $blogannonceventes = BlogannonceventeResource::collection(blogannoncevente::with('user','categoryannoncevente','member')
            ->whereIn('user_id',[$user->id])
            ->orderBy('created_at','DESC')
            ->distinct()->get());

        return response()->json($blogannonceventes,200);
    }

    public function datacount(user $user)
    {
        $blogannonceventes = DB::table('blogannonceventes')
            ->where(['status_admin' => 1])
           ->whereIn('user_id',[$user->id])->count();

        return response()->json($blogannonceventes,200);
    }

    public function dataactivecount(user $user)
    {

        $blogannonceventes =  DB::table('blogannonceventes')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->count();

        return response()->json($blogannonceventes,200);
    }

    public function dataunactivecount(user $user)
    {
        $blogannonceventes =  DB::table('blogannonceventes')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 0,'status_admin' => 1])
            ->count();

        return response()->json($blogannonceventes,200);
    }

    public function datacategorycount(user $user, categoryannoncevente $categoryannoncevente)
    {
        $blogannonceventes = DB::table('blogannonceventes')
            ->where(['status_admin' => 1])
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])->count();

        return response()->json($blogannonceventes,200);
    }

    public function datacategoryactivecount(user $user, categoryannoncevente $categoryannoncevente)
    {
        $blogannonceventes =  DB::table('blogannonceventes')
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->count();

        return response()->json($blogannonceventes,200);
    }


    public function datacategoryunactivecount(user $user, categoryannoncevente $categoryannoncevente)
    {
        $blogannonceventes =  DB::table('blogannonceventes')
            ->whereIn('user_id',[$user->id])
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->where(['status' => 0,'status_admin' => 1])
            ->count();

        return response()->json($blogannonceventes,200);
    }
}
