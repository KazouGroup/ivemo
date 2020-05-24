<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmploymentResource;
use App\Services\EmploymentService;
use Illuminate\Http\Request;
use App\Model\employment;
use App\Model\user;
use App\Model\categoryemployment;
use Illuminate\Support\Facades\DB;

class PremiumemploymentController extends Controller
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

        return view('premium.employment.index',compact('user'));
    }

    public function create(user $user)
    {
        $this->authorize('update',$user);

        return view('premium.employment.index',compact('user'));
    }

    public function edit($user , employment $employment)
    {
        $this->authorize('update',$employment);

        return view('premium.employment.show',[
            'employment'=> $employment,
        ]);
    }

    public function data(user $user)
    {
        $this->authorize('update',$user);

       $employments =  EmploymentResource::collection(employment::with('user','city','categoryemployment','member')
           ->withCount('contactuseremployments')
           ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
           ->whereHas('city', function ($q) {$q->where('status',1);})
           ->whereIn('user_id',[$user->id])
           ->orderBy('created_at','DESC')
           ->distinct()->get());

        return response()->json($employments,200);
    }

    public function datacount(user $user)
    {
        $this->authorize('update',$user);

        $employments = EmploymentService::employmentsbyusersrcount($user)
           ->where(['status_admin' => 1])
           ->whereIn('user_id',[$user->id])->count();

        return response()->json($employments,200);
    }

    public function dataactivecount(user $user)
    {
        $this->authorize('update',$user);

        $employments =  EmploymentService::employmentsbyusersrcount($user)
            ->where(['status' => 1,'status_admin' => 1])
            ->count();

        return response()->json($employments,200);
    }

    public function dataunactivecount(user $user)
    {
        $this->authorize('update',$user);

        $employments =  EmploymentService::employmentsbyusersrcount($user)
            ->where(['status' => 0,'status_admin' => 1])
            ->count();

        return response()->json($employments,200);
    }


    public function datacategorycount(user $user, categoryemployment $categoryemployment)
    {
        $this->authorize('update',$user);

        $employments = EmploymentService::employmentsbyusersrcount($user)
            ->where(['status_admin' => 1])
            ->whereIn('categoryemployment_id',[$categoryemployment->id])->count();

        return response()->json($employments,200);
    }

    public function datacategoryactivecount(user $user, categoryemployment $categoryemployment)
    {
        $this->authorize('update',$user);

        $employments =  EmploymentService::employmentsbyusersrcount($user)
            ->whereIn('categoryemployment_id',[$categoryemployment->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->count();

        return response()->json($employments,200);
    }


    public function datacategoryunactivecount(user $user, categoryemployment $categoryemployment)
    {
        $this->authorize('update',$user);

        $employments =  EmploymentService::employmentsbyusersrcount($user)
            ->whereIn('categoryemployment_id',[$categoryemployment->id])
            ->where(['status' => 0,'status_admin' => 1])
            ->count();

        return response()->json($employments,200);
    }
}
