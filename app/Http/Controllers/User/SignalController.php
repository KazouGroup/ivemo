<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\forum;
use App\Model\employment;
use App\Model\categoryemployment;
use App\Model\city;
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
}
