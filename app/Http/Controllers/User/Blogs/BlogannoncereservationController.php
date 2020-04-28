<?php

namespace App\Http\Controllers\User\Blogs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\Blogannoncereservation\StoreRequest;
use App\Http\Requests\Blog\Blogannoncereservation\UpdateRequest;
use App\Http\Resources\BlogannoncereservationResource;
use App\Services\BlogannoncereservationService;
use App\Model\blogannoncereservation;
use App\Model\categoryannoncereservation;
use Illuminate\Http\Request;
use App\Model\user;
use File;
use Symfony\Component\HttpFoundation\Response;

class BlogannoncereservationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','destroy','activated',
            'unactivated','apiblogannoncesreservationsbyuser','blogannoncesreservationsbyuser',
            'apiblogannoncesreservationscategoryannoncereservationbyuser','blogannoncesreservationscategoryannoncereservationbyuser'
        ]]);
    }

    public function apiannonceblogreservation()
    {
        $blogannoncereservations = blogannoncereservation::with('user','categoryannoncereservation')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->paginate(40);

        return response()->json($blogannoncereservations, 200);
    }

    public function apiannonceblogcategoryreservation(categoryannoncereservation $categoryannoncereservation)
    {
        $blogannoncereservation = categoryannoncereservation::whereSlug($categoryannoncereservation->slug)
            ->where(['status' => 1])
            ->withCount(['blogannoncereservations' => function ($q) use ($categoryannoncereservation){
                $q->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1]);}])
            ->with(['blogannoncereservations' => function ($q) use ($categoryannoncereservation){
                $q->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])
            ->with('user','categoryannoncereservation')->where(['status' => 1])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->orderBy('created_at','DESC')->distinct()->paginate(40);},
            ])->first();

        return response()->json($blogannoncereservation, 200);
    }


    public function apiblogannoncereservationinteresse(categoryannoncereservation $categoryannoncereservation)
    {
        $blogannoncereservation = $categoryannoncereservation->blogannoncereservations()
            ->with('user','categoryannoncereservation')
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(3)->distinct()->get();
        return response()->json($blogannoncereservation, 200);
    }

    public function apiannonceblogcategoryreservationslug($categoryannoncereservation, $date,blogannoncereservation $blogannoncereservation)
    {
        visits($blogannoncereservation)->seconds(5)->increment();

        $blogannoncereservation = new BlogannoncereservationResource(blogannoncereservation::whereDate('created_at',$date)->whereSlug($blogannoncereservation->slug)
            ->where(['status' => 1,'status_admin' => 1])->first());
        return response()->json($blogannoncereservation, 200);
    }

     public function apiblogsannoncereservationspublique(user $user)
    {
       $blogannoncereservations = blogannoncereservation::whereIn('user_id',[$user->id])
           ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
           ->orderBy('created_at','DESC')
           ->where(['status' => 1,'status_admin' => 1])->get();

        return response()->json($blogannoncereservations, 200);

    }

    public function apiblogannoncesreservationsbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){
            $blogannoncereservations = BlogannoncereservationService::apiblogannoncesreservationsbyuser($user);

            return response()->json($blogannoncereservations, 200);
        }else{
            abort(404);
        }

    }

    public function apiblogannoncesreservationscategoryannoncereservationbyuser(user $user,categoryannoncereservation $categoryannoncereservation)
    {
        if (auth()->user()->id === $user->id){
            $blogannoncereservations = BlogannoncereservationService::apiblogannoncesreservationscategoryannoncereservationbyuser($user,$categoryannoncereservation);

            return response()->json($blogannoncereservations, 200);
        }else{
            abort(404);
        }

    }

    public function blogannoncesreservationsbyuser(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.blogs.blogannoncereservation.blogannoncesreservationsbyuser',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }

    }


    public function annonceblogreservation()
    {
       return view('user.blogs.blogannoncereservation.index');
    }

    public function annonceblogcategoryreservation(categoryannoncereservation $categoryannoncereservation)
    {
       return view('user.blogs.blogannoncereservation.category',[
             'categoryannoncereservation' => $categoryannoncereservation,
        ]);
    }

    public function blogannoncesreservationscategoryannoncereservationbyuser(user $user,categoryannoncereservation $categoryannoncereservation)
    {
       return view('user.blogs.blogannoncereservation.category',[
             'categoryannoncereservation' => $categoryannoncereservation,
        ]);
    }

    public function annonceblogcategoryreservationslug($categoryannoncereservation, $date,blogannoncereservation $blogannoncereservation)
    {
       visits($blogannoncereservation)->seconds(5)->increment();

       return view('user.blogs.blogannoncereservation.show',[
             'blogannoncereservation' => $blogannoncereservation,
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
        return view('user.blogs.blogannoncereservation.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $blogannoncereservation= new blogannoncereservation();

        $blogannoncereservation->fill($request->all());
        $blogannoncereservation->description = clean($request->description);

        BlogannoncereservationService::storeUploadImage($request,$blogannoncereservation);

        $blogannoncereservation->save();

        return response('Created',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($blogannoncereservation)
    {

        $blogannoncereservation = BlogannoncereservationService::show($blogannoncereservation);

        return response()->json($blogannoncereservation, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($blogannoncereservation)
    {

        $blogannoncereservation = blogannoncereservation::whereSlugin($blogannoncereservation)->first();
        return view('user.blogs.blogannoncereservation.edit',[
            'blogannoncereservation' => $blogannoncereservation,
        ]);
    }

    public function activated($id)
    {
        $blogannoncereservation = blogannoncereservation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$blogannoncereservation);

        if(auth()->user()->id === $blogannoncereservation->user_id){

            $blogannoncereservation->update(['status' => 1,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    public function unactivated($id)
    {
        $blogannoncereservation = blogannoncereservation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$blogannoncereservation);

        if(auth()->user()->id === $blogannoncereservation->user_id){
            $blogannoncereservation->update(['status' => 0,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $blogannoncereservation
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, $blogannoncereservation)
    {
        $blogannoncereservation = blogannoncereservation::whereSlugin($blogannoncereservation)->firstOrFail();

        $this->authorize('update',$blogannoncereservation);

        BlogannoncereservationService::updateUploadeImage($request,$blogannoncereservation);

        $blogannoncereservation->description = clean($request->description);
        $blogannoncereservation->update($request->all());

        return response()->json($blogannoncereservation,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $blogannoncereservation = blogannoncereservation::findOrFail($id);

        $this->authorize('update',$blogannoncereservation);

        if(auth()->user()->id === $blogannoncereservation->user_id){

            $oldFilename = $blogannoncereservation->photo;
            File::delete(public_path($oldFilename));

            $blogannoncereservation->delete();

            return ['message' => 'Deleted successfully'];
        }else{
            abort(404);
        }
    }
}
