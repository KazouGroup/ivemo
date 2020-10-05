<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Models\user;
use App\Services\HelpersService;
use Illuminate\Http\Request;

class UserpremiumController extends Controller
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


    public function apipremiumindex(user $user)
    {
        $this->authorize('update',$user);

        if ($user->id === auth()->user()->id){
            $user = HelpersService::helperscontactuserscount($user)
                ->with(['profile' => function ($q) use ($user){
                    $q->whereIn('user_id',[$user->id])
                        ->distinct()->get()->toArray()
                    ;},
                ])->first();

            return response()->json($user, 200);
        }else{
            return abort(404);
        }

    }


    public function premiumindex(user $user)
    {
        $this->authorize('update',$user);

        if ($user->id === auth()->user()->id){
            return view('premium.index',[
                'user' => $user,
            ]);
        }else{
            return abort(404);
        }

    }

}
