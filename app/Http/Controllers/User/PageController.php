<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactuseradvertRequest;
use App\Http\Requests\Contactuser\StorecontactuserfaqRequest;
use App\Http\Requests\Contactuser\StorecontactadminsRequest;
use App\Http\Resources\CityResource;
use App\Models\city;
use App\Models\contactusersadvert;
use App\Models\contactusersfaq;
use App\Models\contact;
use App\Models\periodeannonce;
use App\Services\Contactusers\ContactuserService;
use Symfony\Component\HttpFoundation\Response;

class PageController extends Controller
{
    public function about()
    {
        return view('user.about.index');
    }

    public function contact()
    {
        return view('user.contact.index');
    }

    public function annonce()
    {
        return view('user.annonce.index');
    }

    public function faqs()
    {
        return view('user.page.faqs');
    }

    public function policyprivacy()
    {
        return view('user.page.policyprivacy');
    }

    public function conditionutilisation()
    {
        return view('user.page.conditionutilisation');
    }

    public function licencesite()
    {
        return view('user.page.licencesite');
    }

    public function fairelapublicite()
    {
        return view('user.page.fairelapublicite');
    }

    public function city(city $city)
    {
        return view('user.page.city',compact('city'));
    }

    public function apicity(city $city)
    {
        visits($city)->seconds(60)->increment();

        $city = new CityResource(city::whereSlug($city->slug)
            ->withCount(['activitycities' => function ($q){
                $q->where(['status' => 1])
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->firstOrFail());

        return response()->json($city, 200);

    }

    public function apiperiodeannonce()
    {
        $apiperiodeannonces =  periodeannonce::orderByDesc('name')->distinct()->get();

        return response()->json($apiperiodeannonces, 200);

    }

    public function contactusersfaqs(StorecontactuserfaqRequest $request)
    {
        $contactusersfaq = new contactusersfaq();

        $contactusersfaq->fill($request->all());

        $contactusersfaq->save();

        ContactuserService::newEmailcontactadminsfaqs($request);

        return response('Success',Response::HTTP_ACCEPTED);
    }

    public function contactusersadverts(StorecontactuseradvertRequest $request)
    {
        $contactusersadvert = new contactusersadvert();

        $contactusersadvert->fill($request->all());

        $contactusersadvert->save();

        ContactuserService::newEmailcontactusersadvertsUser($request);

        return response('Success',Response::HTTP_ACCEPTED);

    }

    public function contactadmins(StorecontactadminsRequest $request)
    {
        $contactadmins = new contact();

        $contactadmins->fill($request->all());

        $contactadmins->save();

        ContactuserService::newEmailcontactadmins($request);

        return response('Success',Response::HTTP_ACCEPTED);

    }


    public function annonceshow()
    {
        return view('user.annonce.show');
    }

    public function annonceshowcreate()
    {
        return view('user.annonce.create');
    }

    public function annonceshowvendrecreate()
    {
        return view('user.annonce.create_vendre');
    }
}
