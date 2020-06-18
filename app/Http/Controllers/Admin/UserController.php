<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Model\user;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $auth;

    public function __construct(Guard $auth){
        $this->middleware('auth');
        $this->auth = $auth;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        return view('admin.user.index',compact('user'));
    }

    public function userspro()
    {
        $user = Auth::user();

        return view('admin.user.index',compact('user'));
    }

    public function userspar()
    {
        $user = Auth::user();

        return view('admin.user.index',compact('user'));
    }

    public function usersmod()
    {
        $user = Auth::user();

        return view('admin.user.index',compact('user'));
    }

    public function datatablesusers()
    {
        $user = Auth::user();

        return view('admin.user.index',compact('user'));
    }

    public function datatablesadministrators()
    {
        $user = Auth::user();

        return view('admin.user.index',compact('user'));
    }

    public function administrator()
    {
        $user = Auth::user();

        return view('admin.user.index',compact('user'));
    }

    public function api()
    {
        $users = UserResource::collection(user::where('status_user',0)
            ->latest()->paginate(30));
        return response()->json($users,200);
    }

    public function apiuserpro()
    {
        $users = UserResource::collection(user::where(['status_user' => 0,'status_profile' => 1])
            ->latest()->paginate(30));
        return response()->json($users,200);
    }

    public function apiuserpar()
    {
        $users = UserResource::collection(user::where(['status_user' => 0,'status_profile' => 0])
            ->latest()->paginate(30));
        return response()->json($users,200);
    }

    public function apicount()
    {
        $users = user::where('status_user',0)
            ->get()->count();
        return response()->json($users,200);
    }

    public function apiprocount()
    {
        $users = user::where(['status_user' => 0,'status_profile' => 1])
            ->get()->count();
        return response()->json($users,200);
    }

    public function apiparcount()
    {
        $users = user::where(['status_user' => 0,'status_profile' => 0])
            ->get()->count();
        return response()->json($users,200);
    }

    public function apidatatables()
    {
        $users = UserResource::collection(user::latest()->get());
        return response()->json($users,200);
    }

    public function apiusermod()
    {
        $users = UserResource::collection(user::where('status_user',1)
            ->latest()->get());
        return response()->json($users,200);
    }

    public function apimodcount()
    {
        $users = user::where('status_user',1)->get()->count();
        return response()->json($users,200);
    }


    public function dataLastMonth()
    {
        $users = user::where('created_at', '>=', now()->subMonth())->get();

        return $users;
    }

    public function dataCurrentMonth()
    {
        $users = user::where('created_at', '>=', now()->subMonth())->get();

        return $users;
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
        return view('admin.user.show',compact('user'));
    }

    public function admin_profile_edit()
    {
        $user = Auth::user();
        return view('admin.user.show',compact('user'));
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

        $roles = $request->input('roles') ? $request->input('roles') : [];
        $permissions = $request->input('permissions') ? $request->input('permissions') : [];
        $user->syncRoles($permissions);
        $user->syncRoles($roles);

        $user->save();

        return response()->json($user,200);
    }

    public function updateUser(Request $request)
    {
        $this->validate($request, [
            'username' => "required|string|min:2|max:25|unique:users,username,".auth()->check(),
            'email' => ['required', 'email', Rule::unique((new User)->getTable())->ignore(auth()->id())],
            "sex" => "required|in:Female,Male",
            //'birthday' => 'required|date_format:d/m/Y',
        ]);

        $user = auth()->user();

        $data = $user->update($request->only(
            'first_name',
           // 'birthday',
            'last_name',
            'email',
            'username',
            'body',
            'sex',
            'color_name'
        ));
        return response()->json($data,200);
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
