<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\avisuser;
use App\Model\responseavisuser;
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
        $avisusers = avisuser::with('from','to','responseavisusers')
            ->whereIn('to_id',[$user->id])
            ->with(['responseavisusers' => function ($q) use ($user){
                $q->where('status',1)->with('user')
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])
            ->orderBy('created_at','DESC')
            ->where('status',1)->distinct()->get();
            //->where('status',1)->distinct()->paginate(5)->toArray();
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

        $authId = auth()->user()->id;

        $avisuser = avisuser::create([
            'description' => $validatedData['description'],
            'to_id' => $user->id,
            'from_id' => $authId,
        ]);

        return $avisuser->toJson();
    }

    public function avisuser_public_update(Request $request,user $user,$id)
    {
        $validatedData = $request->validate(['description' => 'required|min:5|max:10000']);

        $avisuser = avisuser::where('id', $id)->findOrFail($id);

        $this->authorize('updateFrom',$avisuser);

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

    public function destroy($id)
    {
        $avisuser = avisuser::findOrFail($id);

        $avisuser->delete();

        return ['message' => 'message deleted '];

    }

    /*
     * Ici je fais le traitement de reponses des avis
     */

    public function avisuserresponse_public_save(Request $request,$user,$id)
    {
        $validatedData = $request->validate(['description' => 'required|min:2|max:10000']);

        $responseavisuser = responseavisuser::create([
            'description' => $validatedData['description'],
            'avisuser_id' => $id,
        ]);

        return $responseavisuser->toJson();
    }

    public function avisuserresponse_public_update(Request $request,user $user,$id)
    {
        $validatedData = $request->validate(['description' => 'required|min:5|max:10000']);

        $responseavisuser = responseavisuser::where('id', $id)->findOrFail($id);

        $this->authorize('update',$responseavisuser);

        $responseavisuser->update([ 'description' => $validatedData['description'],]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function responseactivated($id)
    {
        $responseavisuser = responseavisuser::where('id', $id)->findOrFail($id);

        $responseavisuser->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function responseunactivated($id)
    {
        $responseavisuser = responseavisuser::where('id', $id)->findOrFail($id);


        $responseavisuser->update(['status' => 0,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function responsedestroy($id)
    {
        $responseavisuser = responseavisuser::findOrFail($id);

        $this->authorize('update',$responseavisuser);

        $responseavisuser->delete();

        return ['message' => 'data deleted '];

    }
}
