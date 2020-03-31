<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Model\user;
use Illuminate\Http\Request;

class AgencesimmobilieController extends Controller
{
    public function agencesimmobilie()
    {
        return view('user.agencesimmobilie.agences_index');
    }


    public function apiagencesimmobilie()
    {
        //$users = UserResource::collection(user::with('profile')->latest()->distinct()->paginate(40));

        $users = user::with('profile')
            ->with(['profile.city' => function ($q){
                    $q->where(['status' => 1])
                        ->select('id','name','slug','status');}
            ])->with(['profile.categoryprofile' => function ($q){
                    $q->where(['status' => 1])
                        ->distinct()->get();}
            ])->latest()->distinct()->paginate(40);

        return response()->json($users, 200);
    }
}
