<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\forum;
use App\Models\employment;
use App\Models\categoryemployment;
use App\Models\annoncelocation;
use App\Models\annoncetype;
use App\Models\categoryannoncelocation;
use App\Models\city;
use App\Models\annoncevente;
use App\Models\categoryannoncevente;
use App\Models\user;
use Illuminate\Http\Request;

class SignalController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function sendforumsignal(Request $request,$categoryforum,forum $forum)
    {
        $this->validate($request,[
            'message'=>'required|max:5000',
            'subject'=>'required',
        ]);

        $signal = $forum->signals()->create($request->all());

        return response()->json($signal,200);
    }

    public function sendemploymentsignal(Request $request,categoryemployment $categoryemployment,city $city,employment $employment)
    {
        $this->validate($request,[
            'message'=>'required|max:5000',
            'subject'=>'required',
        ]);

        $signal = $employment->signals()->create($request->all());


        return response()->json($signal,200);
    }

    public function annoncelocationsignal(Request $request,annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,annoncelocation $annoncelocation)
    {
        $this->validate($request,[
            'message'=>'required|max:5000',
            'subject'=>'required',
        ]);

        $signal = $annoncelocation->signals()->create($request->all());


        return response()->json($signal,200);
    }

    public function annonceventesignal(Request $request,annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,annoncevente $annoncevente)
    {
        $this->validate($request,[
            'message'=>'required|max:5000',
            'subject'=>'required',
        ]);

        $signal = $annoncevente->signals()->create($request->all());


        return response()->json($signal,200);
    }
}
