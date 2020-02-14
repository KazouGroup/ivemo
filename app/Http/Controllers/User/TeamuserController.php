<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\teamuser;
use App\Model\user;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
        //
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
     * @return array|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $teamuser = teamuser::where('id', $id)->findOrFail($id);
        $this->authorize('update',$teamuser);

        if (auth()->user()->id === $teamuser->user_id){
            $teamuser->delete();
            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }
    }
}
