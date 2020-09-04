<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Http\Controllers\Controller;
use App\Http\Resources\PrivateEmploymentResource;
use App\Model\activitycity;
use App\Model\city;
use App\Model\user;
use App\Services\Contactusers\ContactuserService;
use App\Services\HelpersService;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ContactserviceemploymentExport;
use App\Http\Resources\ContactserviceResource;
use App\Model\employment;
use App\Model\contactservice;
use App\Http\Requests\Contactuser\StorecontactuserativitycityRequest;
use Illuminate\Http\Request;

class ContactserviceactivitycityController extends Controller
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


    public function sendcontactservice(StorecontactuserativitycityRequest $request,city $city,activitycity $activitycity)
    {


        $contactservice = $activitycity->contactservices()->create([
            'full_name' => $request->full_name,
            'to_id' => $activitycity->user_id,
            'email' => $request->email,
            'phone' => $request->phone,
            'from_id' => auth()->guest() ? null : auth()->id(),
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
            'message' => $request->message,
        ]);

        ContactuserService::newEmailToativitycitypageShow($request,$activitycity);

        return response()->json($contactservice,200);
    }

}
