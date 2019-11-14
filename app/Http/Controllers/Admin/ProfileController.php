<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\model\profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
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
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $profile = new ProfileResource(profile::where('id', $id)->findOrFail($id));
        return response()->json($profile,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(profile $profile)
    {

        if (auth()->user()->id === $profile->user_id){

            $this->authorize('update',$profile);

            return view("admin.profile.edit",[
                'profile' => $profile,
            ]);
        }else{
            return back()
                ->with('error',"Unauthorized edit this article contact Author.");
        }
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  profile $profile
     * @return \Illuminate\Http\Response
     */
    public function admin_edit(profile $profile)
    {
        if (auth()->user()->id === $profile->user_id){
            $this->authorize('update',$profile);
            return view('admin.profile.edit',[
                'profile' => $profile,
            ]);
        }else{
            return redirect(route('admin_profile_edit'))
                ->with('error',"Unauthorized edit this article contact Author.");
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, profile $profile)
    {
        $inputs = $request->all();

        $this->authorize('update',$profile);
        try {
            $profile->update($inputs);
        } catch (\Illuminate\Database\QueryException $e){
            Log::error($e);
        }

        return response()->json($profile,200);

    }
}
