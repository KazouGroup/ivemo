<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannonceventeResource;
use App\Model\blogannoncevente;
use App\Model\categoryannoncevente;
use App\Model\user;
use App\Services\BlogannonceventeService;
use Illuminate\Http\Request;

class BlogannonceventeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','destroy','activated','unactivated','apiblogannoncesventesbyuser'
        ]]);
    }

    public function apiannonceblogresevente()
    {
        $blogannoncereseventes = blogannoncevente::with('user','categoryannoncevente')
            ->where(['status' => 1,'status_admin' => 1])->orderBy('created_at','DESC')
            ->distinct()->paginate(40)->toArray();

        return response()->json($blogannoncereseventes, 200);
    }

    public function annonceblogvente()
    {
        return view('user.blogs.blogannoncevente.index');
    }

    public function apiannonceblogcategoryvente(categoryannoncevente $categoryannoncevente)
    {
        $blogannoncereseventes = BlogannonceventeService::apiannonceblogcategoryvente($categoryannoncevente);

        return response()->json($blogannoncereseventes, 200);
    }

    public function apiblogannonceventeinteresse(categoryannoncevente $categoryannoncevente)
    {
        $blogannoncereseventes = $categoryannoncevente->blogannonceventes()
            ->with('user','categoryannoncevente')
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(4)->distinct()->get()->toArray();
        return response()->json($blogannoncereseventes, 200);
    }

    public function apiannonceblogcategoryventeslug($categoryannoncevente, $date, $blogannoncevente)
    {
        $blogannonceresevente = new BlogannonceventeResource(blogannoncevente::whereDate('created_at',$date)
            ->whereSlug($blogannoncevente)
            ->where(['status' => 1,'status_admin' => 1])->first());
        return response()->json($blogannonceresevente, 200);
    }

    public function apiblogsannonceventespublique(user $user)
    {
        $blogannoncereseventes = BlogannonceventeService::apiblogsannonceventespublique($user);

        return response()->json($blogannoncereseventes, 200);
    }


    public function annonceblogcategoryvente(categoryannoncevente $categoryannoncevente)
    {
        return view('user.blogs.blogannoncevente.category',[
            'categoryannoncevente' => $categoryannoncevente,
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
