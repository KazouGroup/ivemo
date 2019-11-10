<?php

namespace App\Http\Controllers\Admin\Partials;

use App\Http\Resources\PermissionResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Symfony\Component\HttpFoundation\Response;

class PermissionController extends Controller
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
     * Display a listing of Permission.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        return view('admin.permission.index');
    }

    public function api()
    {
        $permissions = PermissionResource::collection(Permission::latest()->get());
        return response()->json($permissions,200);
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
            'name'=> "required|string|max:255|unique:permissions",
        ]);
        Permission::create($request->all());

        return response('Created',Response::HTTP_CREATED);
    }

    public function edit(Permission $permission)
    {
        $data = [
            'permissions' => $permission
        ];
        return view('admin.role.edit',$data);
    }
    /**
     * Update Permission in storage.
     *
     * @param \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return array
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'name'=> "required|string|min:2|max:25|unique:permissions,name,{$id}",
        ]);

        $permission = Permission::findOrFail($id);
        $permission->update($request->all());

        return ['message' => 'permission has ben updated'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return ['message' => 'permission deleted '];
    }
}
