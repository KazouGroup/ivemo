<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactuseradvertRequest;
use App\Http\Requests\Contactuser\StorecontactuserfaqRequest;
use App\Model\contactusersadvert;
use App\Model\contactusersfaq;
use App\Services\Contactusers\ContactuserService;

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

    public function contactusersfaqs(StorecontactuserfaqRequest $request)
    {
        $contactusersfaq = new contactusersfaq();

        $contactusersfaq->fill($request->all());

        //ContactuserService::newEmailToprofileUser($request);

        $contactusersfaq->save();

        return response()->json($contactusersfaq,200);

    }

    public function contactusersadverts(StorecontactuseradvertRequest $request)
    {
        $contactusersadvert = new contactusersadvert();

        $contactusersadvert->fill($request->all());

        ContactuserService::newEmailcontactusersadvertsUser($request);

        $contactusersadvert->save();

        return response()->json($contactusersadvert,200);

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
