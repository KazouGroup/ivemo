<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Model\user;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
        return view('admin.user.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'first_name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255','alpha_dash','unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],

        ]);

        $user = user::create([
            'first_name' => $request['first_name'],
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        return response()->json($user,200);
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
    public function edit(user $user)
    {
        $data = [
            'user' => $user
        ];
        return view('admin.user.show',$data);
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
        //dd(request()->all());
        $this->validate($request, [
            'username' => 'required|string|unique:users,username,' . $id,
            'email' => 'required|email|unique:users,email,' . $id,
            "sex" => "required|in:Female,Male",
        ]);

        $user = user::find($id);
        $user->username = $request->username;
        $user->first_name = $request->first_name;
        $user->status_user = $request->status_user;
        $user->status_user = $request->status_user;
        $user->email = $request->email;
        $user->sex = $request->sex;

        //$roles = $request->input('roles') ? $request->input('roles') : [];
        //$user->role_user = $request->role_user;

        $user->save();

        return response()->json($user,200);
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
