<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Signalannonce\SignalannonceventeRequest;
use App\Http\Requests\Signalblogannonce\SignalblogannoncereservationRequest;
use App\Http\Requests\Signalblogannonce\SignalblogannonlocationRequest;
use App\Model\signalannoncereservation;
use App\Model\signalblogannoncelocation;
use App\Model\signalblogannoncevente;
use Illuminate\Http\Request;

class SignalblogannonceController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['signalblogannoncelocation','signalblogannoncereservation','signalblogannoncevente']]);
    }

    public function signalblogannoncelocation(SignalblogannonlocationRequest $request)
    {

        $signalblogannoncelocation = new signalblogannoncelocation();

        $signalblogannoncelocation->fill($request->all());

        $signalblogannoncelocation->save();

        return response()->json($signalblogannoncelocation,200);

    }


    public function signalblogannoncereservation(SignalblogannoncereservationRequest $request)
    {

        $signalannoncereservation = new signalannoncereservation();

        $signalannoncereservation->fill($request->all());

        $signalannoncereservation->save();

        return response()->json($signalannoncereservation,200);

    }

    public function signalblogannoncevente(SignalannonceventeRequest $request)
    {

        $signalblogannoncevente = new signalblogannoncevente();

        $signalblogannoncevente->fill($request->all());

        $signalblogannoncevente->save();

        return response()->json($signalblogannoncevente,200);

    }
}
