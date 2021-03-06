<?php

namespace App\Http\Controllers\User\Blogs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\Blogannoncelocation\StoreRequest;
use App\Http\Requests\Blog\Blogannoncelocation\UpdateRequest;
use App\Http\Resources\BlogannoncelocationResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Models\blogannoncelocation;
use App\Models\categoryannoncelocation;
use App\Models\user;
use App\Services\BlogannoncelocationService;
use Symfony\Component\HttpFoundation\Response;
use File;

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
            'apiblogannonceslocationsbyuser', 'blogannonceslocationsbyuser',
            'blogannonceslocationscategoryannoncelocationbyuser','apiblogannonceslocationscategoryannoncelocationbyuser','apistatistique','statistique'
        ]]);
    }

    public function apiannoncebloglocation()
    {
        $blogannoncelocations = BlogannoncelocationResource::collection(blogannoncelocation::with('user','categoryannoncelocation','member')
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->where(['status' => 1,'status_admin' => 1])->orderBy('created_at','DESC')
            ->distinct()->paginate(40));

        return response()->json($blogannoncelocations, 200);
    }

    public function annoncebloglocation()
    {
        return view('user.blogs.blogannoncelocation.index');
    }

    public function apiannonceblogcategorylocations(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = BlogannoncelocationService::apiannonceblogcategorylocations($categoryannoncelocation);

        return response()->json($blogannoncelocations, 200);
    }

    public function apiannonceblogcategorylocationscount(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = BlogannoncelocationService::apiannonceblogcategorylocationscount($categoryannoncelocation);

        return response()->json($blogannoncelocations, 200);
    }


    public function apiblogannoncelocationinteresse(categoryannoncelocation $categoryannoncelocation)
    {
        $blogannoncelocations = BlogannoncelocationService::apiblogannoncelocationinteresse($categoryannoncelocation);

        return response()->json($blogannoncelocations, 200);
    }

    public function apiblogannonceslocationsbyuser(user $user)
    {
        $this->authorize('update',$user);

        if (auth()->user()->id === $user->id){
            $blogannoncelocations = BlogannoncelocationService::apiblogannonceslocationsbyuser($user);

            return response()->json($blogannoncelocations, 200);
        }else{
            abort(404);
        }

    }

    public function apiblogannonceslocationscategoryannoncelocationbyuser(user $user,categoryannoncelocation $categoryannoncelocation)
    {
        $this->authorize('update',$user);

        if (auth()->user()->id === $user->id){
            $blogannoncelocations = BlogannoncelocationService::apiblogannonceslocationscategoryannoncelocationbyuser($user,$categoryannoncelocation);

            return response()->json($blogannoncelocations, 200);
        }else{
            abort(404);
        }

    }

    public function blogannonceslocationsbyuser(user $user)
    {
        $this->authorize('update',$user);

        if (auth()->user()->id === $user->id){
            return view('user.blogs.blogannoncelocation.blogannonceslocationsbyuser',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }

    }


    public function apiannonceblogcategorylocationslug($categoryannoncelocation, $date,blogannoncelocation $blogannoncelocation)
    {
        visits($blogannoncelocation)->seconds(60)->increment();

        $blogannoncelocation = BlogannoncelocationService::apiannonceblogcategorylocationslug($categoryannoncelocation, $date,$blogannoncelocation);

        return response()->json($blogannoncelocation, 200);
    }

    public function apistatistique(user $user,$blogannoncelocation)
    {
        $this->authorize('update',$user);

        $blogannoncelocation = BlogannoncelocationService::apistatistique($user, $blogannoncelocation);

        return response()->json($blogannoncelocation, 200);
    }

    public function apiblogsannoncereservationspublique(user $user)
    {
        $blogannoncelocations = blogannoncelocation::whereIn('user_id',[$user->id])
            ->orderBy('created_at','DESC')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->get()->toArray();

        return response()->json($blogannoncelocations, 200);

    }

    public function annonceblogcategorylocation(categoryannoncelocation $categoryannoncelocation)
    {
        return view('user.blogs.blogannoncelocation.category',[
            'categoryannoncelocation' => $categoryannoncelocation,
        ]);
    }

    public function blogannonceslocationscategoryannoncelocationbyuser(user $user,categoryannoncelocation $categoryannoncelocation)
    {
        return view('user.blogs.blogannoncelocation.category',[
            'categoryannoncelocation' => $categoryannoncelocation,
        ]);
    }

    public function annonceblogcategorylocationslug($categoryannoncelocation, $date,blogannoncelocation $blogannoncelocation)
    {

        visits($blogannoncelocation)->seconds(60)->increment();

        return view('user.blogs.blogannoncelocation.show',[
            'blogannoncelocation' => $blogannoncelocation,
        ]);
    }

    public function statistique(user $user,$blogannoncelocation)
    {
        return view('user.blogs.blogannoncelocation.show_statistique',[
            'user' => $user,
        ]);
    }


    public function categoryannoncelocations_by_user()
    {
        $categoryannoncelocations = CategoryannoncelocationResource::collection(categoryannoncelocation::with('user')
            ->where(['status' => 1])
            ->withCount(['annoncelocations' => function ($q){
                $q->whereHas('city', function ($q) {$q->where('status',1);})
                  ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);});
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1])
                  ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('annoncelocations_count','desc')
            ->distinct()->get());

        return response()->json($categoryannoncelocations, 200);
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
        return view('user.blogs.blogannoncelocation.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $blogannoncelocation= new blogannoncelocation();

        $blogannoncelocation->fill($request->all());

        $blogannoncelocation->description = clean($request->description);

        BlogannoncelocationService::storeUploadImage($request,$blogannoncelocation);

        $blogannoncelocation->save();

        return response('Created',Response::HTTP_CREATED);
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
        return view('user.blogs.blogannoncelocation.edit',[
            'blogannoncelocation' => $blogannoncelocation,
        ]);
    }

   public function activated($id)
   {
      $blogannoncelocation = blogannoncelocation::where('id', $id)->findOrFail($id);

      $this->authorize('update',$blogannoncelocation);

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

        $this->authorize('update',$blogannoncelocation);

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
     * @param  int  $blogannoncelocation
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function update(UpdateRequest $request,$blogannoncelocation)
    {
        $blogannoncelocation = blogannoncelocation::whereSlugin($blogannoncelocation)->firstOrFail();

        BlogannoncelocationService::updateUploadeImage($request,$blogannoncelocation);

        $blogannoncelocation->description = clean($request->description);
        $blogannoncelocation->slug = null;
        $blogannoncelocation->update($request->all());

        return response()->json($blogannoncelocation,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array
     */
    public function destroy($id)
    {
        $blogannoncelocation = blogannoncelocation::findOrFail($id);

        $this->authorize('update',$blogannoncelocation);

        if (auth()->user()->id === $blogannoncelocation->user_id){
            $oldFilename = $blogannoncelocation->photo;
            File::delete(public_path($oldFilename));
            $blogannoncelocation->delete();
            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }

    }
}
