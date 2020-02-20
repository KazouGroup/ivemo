<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncelocationResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\user;
use App\Services\BlogannoncelocationService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BlogannoncelocationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','destroy','show','activated','unactivated',
        ]]);
    }

    public function apiannonceblogcategorylocations(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = BlogannoncelocationService::apiannonceblogcategorylocations($categoryannoncelocation);

        return response()->json($blogannoncelocations, 200);
    }


    public function apiblogannoncelocationinteresse(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = BlogannoncelocationService::apiblogannoncelocationinteresse($categoryannoncelocation);

        return response()->json($blogannoncelocations, 200);
    }

    public function apiannonceblogcategorylocationslug($categoryannoncelocation, $date,$blogannoncelocation)
    {
        $blogannoncelocation = BlogannoncelocationService::apiannonceblogcategorylocationslug($categoryannoncelocation, $date,$blogannoncelocation);

        return response()->json($blogannoncelocation, 200);
    }


    public function apiblogsannoncereservationspublique(user $user)
    {
        $blogannoncelocations = blogannoncelocation::whereIn('user_id',[$user->id])
            ->orderBy('created_at','DESC')
            ->where('status',1)->get()->toArray();

        return response()->json($blogannoncelocations, 200);

    }

    public function annonceblogcategorylocation(categoryannoncelocation $categoryannoncelocation)
    {
        return view('user.blog.blogannoncelocation.category',[
            'categoryannoncelocation' => $categoryannoncelocation,
        ]);
    }

    public function annonceblogcategorylocationslug($categoryannoncelocation, $date,blogannoncelocation $blogannoncelocation)
    {
        return view('user.blog.blogannoncelocation.show',[
            'blogannoncelocation' => $blogannoncelocation,
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
    public function show($blogannoncelocation)
    {
        $blogannoncelocation = BlogannoncelocationService::show($blogannoncelocation);

        return response()->json($blogannoncelocation, 200);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($blogannoncelocation)
    {
        $blogannoncelocation = blogannoncelocation::whereSlugin($blogannoncelocation)->first();
        return view('user.blog.blogannoncelocation.edit',[
            'blogannoncelocation' => $blogannoncelocation,
        ]);
    }

   public function activated($id)
   {
      $blogannoncelocation = blogannoncelocation::where('id', $id)->findOrFail($id);

      if(auth()->user()->id === $blogannoncelocation->user_id){

          $blogannoncelocation->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
      }else{
         abort(404);
      }
    }

    public function unactivated($id)
    {
        $blogannoncelocation = blogannoncelocation::where('id', $id)->findOrFail($id);

        if(auth()->user()->id === $blogannoncelocation->user_id){

            $blogannoncelocation->update(['status' => 0,]);

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
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       $blogannoncelocation = blogannoncelocation::findOrFail($id);
       $blogannoncelocation->delete();
       return ['message' => 'message deleted '];

    }
}
