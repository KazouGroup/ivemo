<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Signalannonce\SignalannoncelocationRequest;
use App\Http\Requests\Signalannonce\SignalannoncereservationRequest;
use App\Http\Requests\Signalannonce\SignalannonceventeRequest;
use App\Model\signalannoncelocation;
use App\Model\signalannoncereservation;
use App\Model\signalannoncevente;
use Illuminate\Http\Request;

class SignalannonceController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['signalannoncelocation','signalannoncereservation','signalannoncevente']]);
    }

    public function signalannoncelocation(SignalannoncelocationRequest $request)
    {

        $signalannoncelocation = new signalannoncelocation();

        $signalannoncelocation->fill($request->all());

        $signalannoncelocation->save();

        return response()->json($signalannoncelocation,200);

    }

    public function signalannoncereservation(SignalannoncereservationRequest $request)
    {

        $signalannoncereservation = new signalannoncereservation();

        $signalannoncereservation->fill($request->all());

        $signalannoncereservation->save();

        return response()->json($signalannoncereservation,200);

    }

    public function signalannoncevente(SignalannonceventeRequest $request)
    {

        $signalannoncevente = new signalannoncevente();

        $signalannoncevente->fill($request->all());

        $signalannoncevente->save();

        return response()->json($signalannoncevente,200);

    }

}
