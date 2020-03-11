<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\avisuser;
use App\Model\user;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AvisuserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'api','apiavisuserpublique',
        ]]);
    }


    public function apiavisuserpublique(user $user)
    {
        $avisusers = avisuser::with('from','to')
            ->whereIn('to_id',[$user->id])
            ->orderBy('created_at','DESC')
            ->where('status',1)->distinct()->paginate(5)->toArray();
        return response()->json($avisusers, 200);
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

    public function avisuser_public_save(Request $request,user $user)
    {
        $validatedData = $request->validate(['description' => 'required|min:2|max:10000']);

        $avisuser = avisuser::create([
            'description' => $validatedData['description'],
            'to_id' => $user->id,
            'from_id' => auth()->user()->id,
        ]);

        return $avisuser->toJson();
    }

    public function avisuser_public_update(Request $request,user $user,$id)
    {
        $validatedData = $request->validate(['description' => 'required|min:5|max:10000']);

        $avisuser = avisuser::where('id', $id)->findOrFail($id);

        $avisuser->update([ 'description' => $validatedData['description'],]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }



    public function avisuser_public_response(Request $request,user $user,$id)
    {
        $validatedData = $request->validate(['response_description' => 'nullable|min:5|max:10000']);

        $avisuser = avisuser::where('id', $id)->findOrFail($id);

        $avisuser->update([ 'response_description' => $validatedData['response_description'],]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }


    public function unactivated($id)
    {
        $avisuser = avisuser::where('id', $id)->findOrFail($id);

        $avisuser->update(['status' => 0,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
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
