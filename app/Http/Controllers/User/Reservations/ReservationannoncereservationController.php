<?php

namespace App\Http\Controllers\User\Reservations;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StoreRequest;
use App\Http\Resources\UploadimageResource;
use App\Models\annoncetype;
use App\Models\annoncereservation;
use App\Models\categoryannoncereservation;
use App\Models\city;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response;

class ReservationannoncereservationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'getuploadimage',
        ]]);
    }



    public function sendannoncereservation(StoreRequest $request, annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation)
    {

        $reservation = $annoncereservation->reservations()->create([
            'full_name' => $request->full_name,
            'user_id' => Auth::id(),
            'to_id' => $annoncereservation->user_id,
            'email' => $request->email,
            'phone' => $request->phone,
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
            'message' => $request->message,
        ]);

        return response()->json($reservation,200);
    }

}
