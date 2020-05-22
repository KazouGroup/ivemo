<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactuseremploymentRequest;
use App\Http\Requests\Signalblogannonce\SignalblogannoncereservationRequest;
use App\Http\Requests\Signalblogannonce\SignalblogannonceventeRequest;
use App\Http\Requests\Signalblogannonce\SignalblogannonlocationRequest;
use App\Model\contactuseremployment;
use App\Model\employment;
use App\Model\signalblogannoncelocation;
use App\Model\signalblogannoncereservation;
use App\Model\signalblogannoncevente;
use App\Model\signaluseremployment;
use Illuminate\Http\Request;

class SignalemploymentController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['signalemploymentbyslug']]);
    }


    public function signalemploymentbyslug(Request $request, $categoryemployment, $city,employment $employment)
    {
        $this->validate($request,[
            'full_name' => ['required', 'string','min:3', 'max:255'],
            'message' => 'required',
            'confirm_send' => 'required',
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);


        $signaluseremployment = new signaluseremployment();
        $signaluseremployment->fill($request->all());
        $signaluseremployment->employment_id = $employment->id;

        $signaluseremployment->save();

        return response()->json($signaluseremployment,200);
    }

}
