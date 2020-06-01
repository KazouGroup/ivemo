<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employment\StoreRequest;
use App\Http\Requests\Employment\UpdateRequest;
use App\Http\Resources\CategoryemployementResource;
use App\Http\Resources\EmploymentResource;
use App\Model\categoryemployment;
use App\Model\city;
use App\Model\employment;
use App\Model\user;
use App\Services\EmploymentService;
use Illuminate\Http\Request;
use File;
use Symfony\Component\HttpFoundation\Response;

class EmploymentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','destroy','activated','unactivated',
            'apiemploymentsbyuser','employmentsbyuser','apiemploymentsbyusercategoryemployment',
            'employmentsbyusercategoryemployment'
        ]]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function employment()
    {
        return  view('user.employment.index');
    }

    public function employmentbycategory(categoryemployment $categoryemployment)
    {
        return  view('user.employment.categoryemployment',[
            'categoryemployment' => $categoryemployment
        ]);
    }

    public function employmentbycategorybycity($categoryemployment,city $city)
    {
        return  view('user.employment.employmentbycity',[
            'city' => $city
        ]);
    }

    public function employmentbycity(city $city)
    {
        return  view('user.employment.cityemployment',[
            'city' => $city
        ]);
    }

    public function employmentslug($categoryemployment,$city,employment $employment)
    {
        return  view('user.employment.employmentshow',[
            'employment' => $employment
        ]);
    }

    public function employmentsbyuser(user $user)
    {
        $this->authorize('update',$user);

        if (auth()->user()->id === $user->id){
            return view('user.profile.employments.privateprofilemployments',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }

    }

    public function employmentsbyusercategoryemployment(user $user)
    {
        $this->authorize('update',$user);

        if (auth()->user()->id === $user->id){
            return view('user.profile.employments.privateprofilemployments',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('user.employment.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $employment= new employment();

        $employment->fill($request->all());

        $employment->description = clean($request->description);

        EmploymentService::storeUploadImage($request,$employment);

        EmploymentService::sendMessageToUser($request);

        $employment->save();

        return response('Created',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($employment)
    {
        $employment = EmploymentService::show($employment);

        return response()->json($employment, 200);
    }

    public function apiemployments()
    {
        $employments =  EmploymentResource::collection(employment::with('user','city','categoryemployment','member')
            ->where(['status' => 1,'status_admin' => 1])
            ->withCount('contactuseremployments')
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
            ->distinct()->paginate(30));

        return response()->json($employments,200);
    }

    public function apiemploymentsbycategory(categoryemployment $categoryemployment)
    {
        $employments = EmploymentService::apiemploymentsbycategory($categoryemployment);

        return response()->json($employments,200);
    }

    public function apiemploymentbycity(city $city)
    {
        $employments = EmploymentService::apiemploymentbycity($city);

        return response()->json($employments,200);
    }

    public function apiemploymentsbycategorybycity(categoryemployment $categoryemployment,city $city)
    {
        $employments = EmploymentService::apiemploymentsbycategorybycity($categoryemployment,$city);

        return response()->json($employments,200);
    }

    public function apiemploymentsbycategoryslug(categoryemployment $categoryemployment,city $city,employment $employment)
    {
        visits($employment)->seconds(60)->increment();

        $employments = EmploymentService::apiemploymentsbycategoryslug($categoryemployment,$city,$employment);

        return response()->json($employments,200);
    }

    public function apiemploymentsinteresse(categoryemployment $categoryemployment)
    {
        $employments = EmploymentService::apiemploymentsinteresse($categoryemployment);

        return response()->json($employments,200);
    }

    public function apicategoryemployment()
    {
        $categoryemployments = EmploymentService::apicategoryemployment();

        return response()->json($categoryemployments, 200);
    }

    public function apicityemployment()
    {
        $cityemployments = EmploymentService::apicityemployment();

        return response()->json($cityemployments, 200);
    }

    public function apiemploymentbycategorybycount(categoryemployment $categoryemployment)
    {
        $categoryemploymentsbycity = EmploymentService::apiemploymentbycategorybycount($categoryemployment);

        return response()->json($categoryemploymentsbycity, 200);
    }

    public function apiemploymentsbyuser(user $user)
    {
        $this->authorize('update',$user);

        if (auth()->user()->id === $user->id){

            $data = EmploymentService::apiemploymentsbyuser($user);

            return response()->json($data, 200);

        }else{
            return abort(404);
        }

    }

    public function apiemploymentsbyusercategoryemployment(user $user,categoryemployment $categoryemployment)
    {
        $this->authorize('update',$user);

        $employments = EmploymentService::apiemploymentsbyusercategoryemployment($user,$categoryemployment);

        return response()->json($employments, 200);

    }

    public function apicategoryemployments_by_user()
    {
        $categoryemployments = CategoryemployementResource::collection(categoryemployment::with('user')
            ->where(['status' => 1])
            ->withCount(['employments' => function ($q){
                $q->where(['status_admin' => 1])
                    ->whereIn('user_id',[auth()->user()->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('employments_count','desc')
            ->distinct()->get());

        return response()->json($categoryemployments, 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($employment)
    {
        $employment = employment::whereSlugin($employment)->first();

        $this->authorize('update',$employment);

        return view('user.employment.edit',[
            'employment' => $employment,
        ]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request,$employment)
    {
        $employment = employment::whereSlugin($employment)->firstOrFail();

        $this->authorize('update',$employment);

        EmploymentService::updateUploadeImage($request,$employment);

        $employment->description = clean($request->description);
        $employment->slug = null;
        $employment->update($request->all());

        return response()->json($employment,200);
    }

    public function activated($employment)
    {
        $employment = employment::where('id', $employment)->findOrFail($employment);

        $this->authorize('update',$employment);

        if(auth()->user()->id === $employment->user_id){

            $employment->update(['status' => 1,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    public function unactivated($employment)
    {
        $employment = employment::where('id', $employment)->findOrFail($employment);

        $this->authorize('update',$employment);

        if(auth()->user()->id === $employment->user_id){

            $employment->update(['status' => 0,]);

            return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
            abort(404);
        }
    }

    public function destroy($id)
    {
        $employment = employment::findOrFail($id);

        $this->authorize('update',$employment);

        if(auth()->user()->id === $employment->user_id){

            $oldFilename = $employment->photo;
            File::delete(public_path($oldFilename));

            $employment->delete();

            return ['message' => 'Deleted successfully'];
        }else{
            abort(404);
        }
    }
}
