<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncereservationResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Http\Resources\CategoryannoncereservationResource;
use App\Services\BlogannoncereservationService;
use App\Model\blogannoncereservation;
use App\Model\categoryannoncelocation;
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
            'create','store','edit','update','destroy','activated','unactivated','apiblogannoncesreservationsbyuser'
        ]]);
    }

    public function apiannonceblogreservation()
    {
        $blogannoncereservations = blogannoncereservation::with('user','categoryannoncereservation')
            ->where(['status' => 1,'status_admin' => 1])->orderBy('created_at','DESC')
            ->distinct()->paginate(40)->toArray();

        return response()->json($blogannoncereservations, 200);
    }

    public function apiannonceblogcategoryreservation(categoryannoncereservation $categoryannoncereservation)
    {
        $blogannoncereservation = categoryannoncereservation::whereSlug($categoryannoncereservation->slug)
            ->with(['blogannoncereservations' => function ($q) use ($categoryannoncereservation){
                $q->where(['status' => 1,'status_admin' => 1])
            ->with('user','categoryannoncereservation')
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->orderBy('created_at','DESC')->distinct()->paginate(40)->toArray();},
            ])->first();

        return response()->json($blogannoncereservation, 200);
    }


    public function apiblogannoncereservationinteresse(categoryannoncereservation $categoryannoncereservation)
    {
        $blogannoncereservation = $categoryannoncereservation->blogannoncereservations()
            ->with('user','categoryannoncereservation')
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->orderByRaw('RAND()')
            ->where(['status' => 1,'status_admin' => 1])
            ->take(3)->distinct()->get()->toArray();
        return response()->json($blogannoncereservation, 200);
    }

    public function apiannonceblogcategoryreservationslug($categoryannoncereservation, $date, $blogannoncereservation)
    {
        $blogannoncereservation = new BlogannoncereservationResource(blogannoncereservation::whereDate('created_at',$date)->whereSlug($blogannoncereservation)
            ->where(['status' => 1,'status_admin' => 1])->first());
        return response()->json($blogannoncereservation, 200);
    }

     public function apiblogsannoncereservationspublique(user $user)
    {
       $blogannoncereservations = blogannoncereservation::whereIn('user_id',[$user->id])
           ->orderBy('created_at','DESC')
           ->where(['status' => 1,'status_admin' => 1])->get()->toArray();

        return response()->json($blogannoncereservations, 200);

    }

    public function apiblogannoncesreservationsbyuser(user $user)
    {
        $blogannoncereservations = BlogannoncereservationService::apiblogannoncesreservationsbyuser($user);

        return response()->json($blogannoncereservations, 200);
    }

    public function blogannoncesreservationsbyuser()
    {
        return view('user.blogs.blogannoncereservation.blogannoncesreservationsbyuser',[
            'user' => auth()->user(),
        ]);
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

    public function annonceblogcategoryreservationslug($categoryannoncereservation, $date,blogannoncereservation $blogannoncereservation)
    {
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
