<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactuserannoncelocationRequest;
use App\Http\Resources\PrivateEmploymentResource;
use App\Model\annoncelocation;
use App\Model\annoncetype;
use App\Model\categoryannoncelocation;
use App\Model\city;
use App\Model\user;
use App\Services\Contactusers\ContactuserslocationService;
use App\Services\HelpersService;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ContactserviceemploymentExport;
use App\Http\Resources\ContactserviceResource;
use App\Services\Contactusers\ContactusersemploymentService;
use App\Model\employment;
use App\Model\contactservice;
use Illuminate\Http\Request;

class ContactservicannoncelocationController extends Controller
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

    public function contactservice(user $user)
    {
        $this->authorize('update',$user);

        return view('user.contactservice.index', compact('user'));
    }

    public function personalmessagesemployments(user $user)
    {
        $this->authorize('update',$user);

        return view('user.contactservice.index', compact('user'));
    }

    public function contactservice_statistique($user, employment $employment)
    {
        return view('user.contactservice.show', compact('employment'));
    }

    public function contactservice_statistiqueshow($user,contactservice $contactservice )
    {

        return view('user.contactservice.showcontact', compact('contactservice'));
    }

    public function personalmessagesemployments_show($user,contactservice $contactservice )
    {
        return view('user.contactservice.showcontact', compact('contactservice'));
    }

    public function sendcontactserviceannonce(StorecontactuserannoncelocationRequest $request,annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$user,annoncelocation $annoncelocation)
    {


        $contactservice = $annoncelocation->contactservices()->create([
            'full_name' => $request->full_name,
            'to_id' => $annoncelocation->user_id,
            'email' => $request->email,
            'phone' => $request->phone,
            'from_id' => auth()->id(),
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
            'message' => $request->message,
        ]);

        ContactuserslocationService::newEmailToannoncelocationpageShow($request,$annoncelocation);

        return response()->json($contactservice,200);
    }

    public function apipersonalmessagesemployments(user $user)
    {
        $contactservices = HelpersService::helperscontactuserscount($user)
            ->with(['contactservicesemployments' => function ($q) use ($user){
                $q->with('to','from','contactserviceable')
                    ->where('contactserviceable_type',employment::class)
                    ->whereIn('to_id',[$user->id])
                    ->whereHas('contactserviceable', function ($q) {
                        $q->whereIn('user_id',[Auth::id()]);})
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return response()->json($contactservices,200);
    }

    public function apicontactservice(user $user)
    {
        $this->authorize('update',$user);

        $contactservices = $user->employments()
        ->with('user','city','categoryemployment','member')
        ->whereIn('user_id',[$user->id])
        ->with(['user' => function ($q) {$q->with('profile')
            ->distinct()->get();}])
        ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
        ->whereHas('city', function ($q) {$q->where('status',1);})
        ->withCount(['contactservices' => function ($q) use ($user){
            $q->where(['status_red' => 0])->whereIn('to_id',[$user->id]);
        }])->orderBy('contactservices_count','desc')
        ->has('contactservices','>=',1)
        //->having('contactservices_count', '>=', 1)
        ->distinct()->get();

        return response()->json($contactservices,200);

    }

    public function apicontactservice_statistique(user $user, employment $employment)
    {
        $contactservice = new PrivateEmploymentResource(employment::whereSlugin($employment->slugin)
            ->withCount(['contactservices' => function ($q) use ($user){
                $q->where(['status_red' => 0])
                    ->with('to','from')
                    ->whereIn('to_id',[$user->id]);},])
            ->whereIn('user_id',[$user->id])
            ->with(['contactservices' => function ($q) use ($user){
                $q->with('to','from')
                    ->whereIn('to_id',[$user->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])
            ->with('user','city','categoryemployment','member')
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])->first());

        return response()->json($contactservice,200);
    }

    public function contactservice_export(user $user, employment $employment)
    {
        return Excel::download(new ContactserviceemploymentExport($user,$employment), 'Infos-users.xlsx');
    }


    public function apicontactservice_statistiqueshow($user,contactservice $contactservice)
    {
        $contactservice = new ContactserviceResource(contactservice::whereSlug($contactservice->slug)
        ->with('to','from','contactserviceable')
        ->whereIn('to_id',[Auth::id()])
        ->with(['contactserviceable' => function ($q){
            $q->whereIn('user_id',[Auth::id()])
            ->with('user','city','categoryemployment','member')
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->with(['user.profile' => function ($q){$q->distinct()->get();},]);},
        ])->first());


        return response()->json($contactservice,200);
    }
}
