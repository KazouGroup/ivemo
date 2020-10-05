<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmploymentResource;
use App\Models\contactuseremployment;
use App\Services\EmploymentService;
use Illuminate\Http\Request;
use App\Models\employment;
use App\Models\user;
use App\Models\categoryemployment;
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

    public function edit(user $user,employment $employment)
    {
        $this->authorize('update',$employment);

        return view('premium.employment.show',[
            'employment'=> $employment,
        ]);
    }

    public function datamessage(user $user,employment $employment)
    {
        $this->authorize('update',$employment);

        return view('premium.employment.show',[
            'employment'=> $employment,
        ]);
    }

    public function datamessageshow(user $user,contactuseremployment $contactuseremployment)
    {
        $this->authorize('update',$user);

        return view('premium.employment.view',[
            'contactuseremployment'=> $contactuseremployment,
        ]);
    }

    /*
     * Bon ici pour compter je ne doits pas filter la ville et la category puisque
     * si la ville ou la category viens à etre desactiver l'utilisateur
     *  dois toujour avoir ses message bien conpter
     */
    public function data(user $user)
    {
        $this->authorize('update',$user);

       $employments =  EmploymentResource::collection(employment::with('user','city','categoryemployment','member')
           ->withCount(['contactuseremployments' => function ($q) use ($user){
               $q->with('employment','user')
                   ->where('status_red',0)
                   ->whereIn('user_id',[$user->id])
               ;},
           ])
           ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
           ->whereHas('city', function ($q) {$q->where('status',1);})
           ->whereIn('user_id',[$user->id])
           ->orderBy('created_at','DESC')
           ->distinct()->get());

        return response()->json($employments,200);
    }

    /*
    * Bon ici pour compter je ne doits pas filter la ville et la category puisque
    * si la ville ou la category viens à etre desactiver l'utilisateur
    *  dois toujour avoir ses message bien conpter
    */

    public function apidatamessage(user $user,employment $employment)
    {
        $this->authorize('update',$user);

        $employment = employment::whereSlug($employment->slug)
            ->with('user','city','categoryemployment','member')
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])
            ->withCount(['contactuseremployments' => function ($q) use ($user){
                $q->with('employment','user')
                    ->whereIn('user_id',[$user->id])
                ;},
            ])
            ->with(['contactuseremployments' => function ($q) use ($user){
                $q->with('employment','user')
                    ->whereIn('user_id',[$user->id])
                    ->with(['employment.city' => function ($q){$q->distinct()->get();}])
                    ->with(['employment.categoryemployment' => function ($q){$q->distinct()->get();}])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])
            ->first();

        return response()->json($employment,200);
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
