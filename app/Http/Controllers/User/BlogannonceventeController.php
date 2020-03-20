<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\Blogannoncevente\StoreRequest;
use App\Http\Requests\Blog\Blogannoncevente\UpdateRequest;
use App\Http\Resources\BlogannonceventeResource;
use App\Model\blogannoncevente;
use App\Model\categoryannoncevente;
use App\Model\user;
use App\Services\BlogannonceventeService;
use Illuminate\Http\Request;
use File;
use Symfony\Component\HttpFoundation\Response;

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
            'create','store','edit','update','destroy','activated','unactivated','apiblogannoncesventesbyuser',
            'apiblogannoncesventescategoryannonceventebyuser','blogannoncesventesbyuser'
        ]]);
    }

    public function apiannonceblogresevente()
    {
        $blogannoncereseventes = blogannoncevente::with('user','categoryannoncevente')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
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

    public function apiblogannoncesventescategoryannonceventebyuser(user $user,categoryannoncevente $categoryannoncevente)
    {
        $blogannoncereseventes = BlogannonceventeService::apiblogannoncesventescategoryannonceventebyuser($user,$categoryannoncevente);

        return response()->json($blogannoncereseventes, 200);
    }

    public function apiblogannonceventeinteresse(categoryannoncevente $categoryannoncevente)
    {
        $blogannoncereseventes = $categoryannoncevente->blogannonceventes()
            ->with('user','categoryannoncevente')
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->take(3)->distinct()->get()->toArray();
        return response()->json($blogannoncereseventes, 200);
    }

    public function apiannonceblogcategoryventeslug($categoryannoncevente, $date, $blogannoncevente)
    {
        $blogannonceresevente = new BlogannonceventeResource(blogannoncevente::whereDate('created_at',$date)
            ->whereSlug($blogannoncevente)
            ->where(['status' => 1,'status_admin' => 1])->first());
        return response()->json($blogannonceresevente, 200);
    }

    //public function apiblogsannonceventespublique(user $user)
    //{
    //    $blogannoncereseventes = BlogannonceventeService::apiblogsannonceventespublique($user);

    //    return response()->json($blogannoncereseventes, 200);
    //}


    public function annonceblogcategoryvente(categoryannoncevente $categoryannoncevente)
    {
        return view('user.blogs.blogannoncevente.category',[
            'categoryannoncevente' => $categoryannoncevente,
        ]);
    }

    public function annonceblogcategoryventeslug($categoryannoncevente, $date,blogannoncevente $blogannoncevente)
    {
        return view('user.blogs.blogannoncevente.show',[
            'blogannoncevente' => $blogannoncevente,
        ]);
    }

    public function apiblogannoncesventesbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){

            $blogannonceventes = BlogannonceventeService::apiblogannoncesventesbyuser($user);

            return response()->json($blogannonceventes, 200);
        }else{
            abort(404);
        }

    }


    public function blogannoncesventesbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){

            return view('user.blogs.blogannoncevente.blogannoncesreservationsbyuser',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }

    }


    public function blogannoncesventescategoryannonceventebyuser(user $user,categoryannoncevente $categoryannoncevente)
    {
        if (auth()->user()->id === $user->id){

            return view('user.blogs.blogannoncevente.blogannoncesventescategoryannonceventebyuser',[
                'user' => auth()->user(),
                'categoryannoncevente' => $categoryannoncevente,
            ]);
        }else{
            abort(404);
        }

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
        return view('user.blogs.blogannoncevente.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $blogannoncevente= new blogannoncevente();

        $blogannoncevente->fill($request->all());

        BlogannonceventeService::storeUploadImage($request,$blogannoncevente);

        $blogannoncevente->save();

        return response('Created',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($blogannoncevente)
    {

        $blogannoncevente = BlogannonceventeService::show($blogannoncevente);

        return response()->json($blogannoncevente, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($blogannoncevente)
    {

        $blogannoncevente = blogannoncevente::whereSlugin($blogannoncevente)->first();
        return view('user.blogs.blogannoncevente.edit',[
            'blogannoncevente' => $blogannoncevente,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, $blogannoncevente)
    {
        $blogannoncevente = blogannoncevente::whereSlugin($blogannoncevente)->firstOrFail();

        $this->authorize('update',$blogannoncevente);

        BlogannonceventeService::updateUploadeImage($request,$blogannoncevente);

        $blogannoncevente->update($request->all());

        return response()->json($blogannoncevente,200);
    }


    public function activated($id)
    {
        $blogannoncevente = blogannoncevente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$blogannoncevente);

        if(auth()->user()->id === $blogannoncevente->user_id){

            $blogannoncevente->update(['status' => 1,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    public function unactivated($id)
    {
        $blogannoncevente = blogannoncevente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$blogannoncevente);

        if(auth()->user()->id === $blogannoncevente->user_id){

            $blogannoncevente->update(['status' => 0,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array
     */
    public function destroy($id)
    {
        $blogannoncevente = blogannoncevente::findOrFail($id);

        $this->authorize('update',$blogannoncevente);

        if(auth()->user()->id === $blogannoncevente->user_id){

            $oldFilename = $blogannoncevente->photo;
            File::delete(public_path($oldFilename));

            $blogannoncevente->delete();

            return ['message' => 'Deleted successfully'];
        }else{
            abort(404);
        }
    }
}
