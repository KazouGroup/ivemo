<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Model\user;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $auth;

    public function __construct(Guard $auth){
        $this->middleware('auth',['except' => ['api','apiadministrator','show']]);
        $this->auth = $auth;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.user.index');
    }

    public function administrator()
    {
        return view('admin.user.index');
    }

    public function api()
    {
        $users = UserResource::collection(User::where('status_user',0)
            ->latest()->get());
        return response()->json($users,200);
    }

    public function apiadministrator()
    {
        $users = UserResource::collection(User::where('status_user',1)
            ->latest()->get());
        return response()->json($users,200);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = new UserResource(user::where('id', $id)->findOrFail($id));
        return response()->json($user,200);
    }

    public function user()
    {
        $user = new UserResource(auth()->user());
        return response()->json($user,200);
    }

    public function admin_profile()
    {
        $user = Auth::user();
        return view('admin.profile.edit',compact('user'));
    }

    public function admin_profile_edit()
    {
        $user = Auth::user();
        return view('admin.profile.edit',compact('user'));
    }

    public function user_edit()
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
