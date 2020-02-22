<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Teamuser\StoreRequest;
use App\Http\Requests\Teamuser\UpdateRequest;
use App\Model\teamuser;
use App\Model\user;
use App\Services\TeamuserService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use File;

class TeamuserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'api','apiteamuserpublique',
        ]]);
    }

    public function apiteamuserpublique(user $user)
    {
        $teamusers = teamuser::with('user')->whereIn('user_id',[$user->id])
        ->orderBy('created_at','DESC')
        ->where('status',1)->get()->toArray();
        return response()->json($teamusers, 200);
    }


    public function apiteamuserprivate()
    {
        $teamusers = teamuser::with('user')->whereIn('user_id',[auth()->user()->id])
        ->orderBy('created_at','DESC')->get()->toArray();
        return response()->json($teamusers, 200);
    }


    public function teamuserprivate()
    {
        return view('user.teamuser.index',[
            'user'=> auth()->user(),
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(StoreRequest $request)
    {
        $teamuser= new teamuser();

        $teamuser->fill($request->all());

        TeamuserService::storeUploadImage($request,$teamuser);

        $teamuser->save();

        return response('Created',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($teamuser)
    {
        $teamuser = teamuser::whereId($teamuser)->first();

        return response()->json($teamuser, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(teamuser $teamuser)
    {
        return view('user.teamuser.edit',[
            'teamuser'=> $teamuser,
        ]);
    }

    public function activated($id)
    {
      $teamuser = teamuser::where('id', $id)->findOrFail($id);
      $this->authorize('update',$teamuser);

      if(auth()->user()->id === $teamuser->user_id){
          $teamuser->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
      }else{
         abort(404);
      }
    }

    public function unactivated($id)
    {
        $teamuser = teamuser::where('id', $id)->findOrFail($id);
        $this->authorize('update',$teamuser);

        if(auth()->user()->id === $teamuser->user_id){
            $teamuser->update(['status' => 0,]);

          return response('Confirmed',Response::HTTP_ACCEPTED);
        }else{
           abort(404);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, $id)
    {
        $teamuser = teamuser::findOrFail($id);

        TeamuserService::updateUploadeImage($request,$teamuser);

        $teamuser->update($request->all());

        return response()->json($teamuser,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $teamuser = teamuser::where('id', $id)->findOrFail($id);
        $this->authorize('update',$teamuser);

        if (auth()->user()->id === $teamuser->user_id){
            $oldFilename = $teamuser->photo;
            File::delete(public_path($oldFilename));
            $teamuser->delete();
            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }
    }
}
