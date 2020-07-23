<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Http\Controllers\Controller;
use App\Http\Resources\PrivateEmploymentResource;
use App\Model\categoryemployment;
use App\Model\city;
use App\Model\user;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ContactserviceemploymentExport;
use App\Http\Resources\ContactserviceResource;
use App\Services\Contactusers\ContactusersemploymentService;
use App\Model\employment;
use App\Model\contactservice;
use App\Http\Requests\Contactuser\StorecontactuseremploymentRequest;
use Illuminate\Http\Request;

class ContactservicemploymentController extends Controller
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
        return view('user.contactservice.employment.index', compact('user'));
    }

    public function contactservice_statistique($user, employment $employment)
    {
        return view('user.contactservice.employment.show', compact('employment'));
    }

    public function contactservice_statistiqueshow($user, $employment,contactservice $contactservice )
    {
        return view('user.contactservice.employment.showcontact', compact('contactservice'));
    }

    public function sendcontactservice(StorecontactuseremploymentRequest $request,categoryemployment $categoryemployment,city $city,employment $employment)
    {


        $contactservice = $employment->contactservices()->create([
            'full_name' => $request->full_name,
            'to_id' => $employment->user_id,
            'email' => $request->email,
            'phone' => $request->phone,
            'from_id' => auth()->id(),
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
            'message' => $request->message,
        ]);

        ContactusersemploymentService::newEmailToemploymentpageShow($request,$employment);

        return response()->json($contactservice,200);
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


    public function apicontactservice_statistiqueshow(user $user, employment $employment,contactservice $contactservice)
    {
        $contactservice = new ContactserviceResource(contactservice::whereSlug($contactservice->slug)
        ->with('to','from','contactserviceable')
        ->whereIn('to_id',[$user->id])
        ->with(['contactserviceable' => function ($q) use ($user){
            $q->whereIn('user_id',[$user->id])
            ->with('user','city','categoryemployment','member')
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->with(['user.profile' => function ($q){$q->distinct()->get();},]);},
        ])->first());


        return response()->json($contactservice,200);
    }
}