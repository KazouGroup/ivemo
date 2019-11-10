<?php

namespace App\Http\Controllers\Admin\Partials;


use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::orderBy('id','DESC')->get();
        return view('admin.role.index',compact('roles'));
    }

    public function api()
    {
        $roles = RoleResource::collection(Role::orderBy('id','DESC')->latest()->get());
        return response()->json($roles,200);
    }

    //public function apiRoles()
    //{
    //    return UsersrolesResource::collection(Role::with('role')->latest()->get());
    //}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $permissions = Permission::get()->pluck('name', 'name');
        return view('admin.roles.create',compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:roles,name',
            'permission' => 'required',
        ]);



        $role = Role::create($request->except('permission'));
        $permissions = $request->input('permission') ? $request->input('permission') : [];
        $role->givePermissionTo($permissions);


        //alert()->success('Success', "Role has ben created successfully");
        //toastr()->success('<b>Role has been created !</b>','<button type="button" class="close" data-dismiss="alert" aria-label="Close">&times;</button>');
        return redirect()->route('roles.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = new RoleResource(Role::where('id', $id)->findOrFail($id));

        return response()->json($role,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $permissions = Permission::get()->pluck('name', 'name');

        $role = Role::findOrFail($id);


        return view('admin.role.edit',compact('role','permissions'));
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
        $this->validate($request, [
            'name' => 'required',
        ]);


        $role = Role::findOrFail($id);
        $role->update($request->except('permission'));
        $permissions = $request->input('permission') ? $request->input('permission') : [];
        $role->syncPermissions($permissions);


        //toastr()->success('<b>Role has been updated !</b>','<button type="button" class="close" data-dismiss="alert" aria-label="Close">&times;</button>');
        return redirect()->route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return ['message' => 'Rle deleted '];
    }

    public function deleteMultiple(Request $request)
    {
        $ids = $request->ids;
        Role::whereIn('id',explode(",",$ids))->delete();
        return response()->json(['status'=>true,'message'=>"Role deleted successfully."]);

    }
}
