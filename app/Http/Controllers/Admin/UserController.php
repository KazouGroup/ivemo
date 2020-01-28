<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateRequest;
use App\Http\Resources\UserResource;
use App\Model\user;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
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
        $this->middleware('auth',['except' => ['api','apiadministrator','show','apidatatables']]);
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

    public function datatablesusers()
    {
        return view('admin.user.index');
    }

    public function datatablesadministrators()
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
            ->latest()->paginate(12));
        return response()->json($users,200);
    }

    public function apidatatables()
    {
        $users = UserResource::collection(User::latest()->get());
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

    public function updateUser(UpdateRequest $request)
    {

        $user = auth()->user();
        /**
         * Avatr image upload
         */
        $currentPhoto = $user->avatar;
        if ($request->avatar != $currentPhoto){

            $namefile = sha1(date('YmdHis') . str_random(30));
            $name = $namefile .'.' . explode('/',explode(':',substr($request->avatar,0,strpos
                ($request->avatar,';')))[1])[1];

            $dir = 'assets/img/avatars/user/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            Image::make($request->avatar)->fit(400,400)->save(public_path('assets/img/avatars/user/').$name);


            $request->merge(['avatar' =>  "/assets/img/avatars/user/{$name}"]);

            // Ici on suprimme l'image existant
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }

        /**
         * Coverpage Uploade
         */
        $currentCoverPhoto = $user->avatarcover;
        if ($request->avatarcover != $currentCoverPhoto){

            $namefile = sha1(date('YmdHis') . str_random(30));
            $name = $namefile .'.' . explode('/',explode(':',substr($request->avatarcover,0,strpos
                ($request->avatarcover,';')))[1])[1];

            $dir = 'assets/img/avatarcovers/user/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            Image::make($request->avatarcover)->save(public_path('assets/img/avatarcovers/user/').$name);


            $request->merge(['avatarcover' =>  "/assets/img/avatarcovers/user/{$name}"]);

            // Ici on suprimme l'image existant
            $oldCoverFilename = $currentCoverPhoto;
            File::delete(public_path($oldCoverFilename));
        }

        $data = $user->update($request->only(
            'first_name',
            'last_name',
            'email',
            'username',
            'color_name',
            'avatar',
            'avatarcover',
            'password',
            'country_id'
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
