<?php

namespace App\Http\Controllers\Admin\Blogs;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnonceventeResource;
use App\Http\Resources\BlogannonceventeResource;
use App\Model\annoncevente;
use App\Model\blogannoncevente;
use App\Model\categoryannoncevente;
use App\Services\BlogannonceventeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class DashboardblogannonceventeController extends Controller
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
        $blogannonceventes = BlogannonceventeResource::collection(blogannoncevente::with('user','member','categoryannoncevente')
            ->distinct()->paginate(10));

        return response()->json($blogannonceventes,200);
    }

    public function categoryannoncevente(categoryannoncevente $categoryannoncevente)
    {
        $blogannoncereseventes = categoryannoncevente::whereSlug($categoryannoncevente->slug)->where(['status' => 1])
            ->withCount(['blogannonceventes' => function ($q)  use ($categoryannoncevente){
                $q->with('user','categoryannoncevente')
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);});
            }])->with(['blogannonceventes' => function ($q) use ($categoryannoncevente){
                $q->with('user','categoryannoncevente')
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')->distinct()->paginate(40);},
            ])->first();;

        return response()->json($blogannoncereseventes, 200);
    }

    public function blogannonceventescount()
    {
        $blogannonceventes = DB::table('blogannonceventes')->count();

        return response()->json($blogannonceventes,200);
    }

    public function blogannonceventesactivecount()
    {
        $blogannonceventes = blogannoncevente::where(['status' => 1,'status_admin' => 1])->get()->count();

        return response()->json($blogannonceventes,200);
    }

    public function blogannonceventesunactivecount()
    {
        $blogannonceventes = blogannoncevente::where('status',0)->get()->count();

        return response()->json($blogannonceventes,200);
    }

    public function index()
    {
        return view('admin.blog.blogannonceventes.index');
    }

    public function show(categoryannoncevente $categoryannoncevente)
    {
        return view('admin.blog.blogannonceventes.show',[
            'categoryannoncevente' => $categoryannoncevente,
        ]);
    }

    public function activated($id)
    {
        $blogannoncevente = blogannoncevente::where('id', $id)->findOrFail($id);

        $blogannoncevente->update([
            'status_admin' => 1,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $blogannoncevente = blogannoncevente::where('id', $id)->findOrFail($id);

        $blogannoncevente->update([
            'status_admin' => 0,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

}
