<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Signalblogannonce\SignalblogannoncereservationRequest;
use App\Http\Requests\Signalblogannonce\SignalblogannonceventeRequest;
use App\Http\Requests\Signalblogannonce\SignalblogannonlocationRequest;
use App\Models\signalblogannoncelocation;
use App\Models\signalblogannoncereservation;
use App\Models\signalblogannoncevente;
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

        $signalblogannoncereservation = new signalblogannoncereservation();

        $signalblogannoncereservation->fill($request->all());

        $signalblogannoncereservation->save();

        return response()->json($signalblogannoncereservation,200);

    }

    public function signalblogannoncevente(SignalblogannonceventeRequest $request)
    {

        $signalblogannoncevente = new signalblogannoncevente();

        $signalblogannoncevente->fill($request->all());

        $signalblogannoncevente->save();

        return response()->json($signalblogannoncevente,200);

    }
}
