<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactRequest;
use App\Model\annoncelocation;
use App\Model\annoncetype;
use App\Model\categoryannoncelocation;
use App\Model\city;
use App\Model\contactuser;
use App\Model\contactuserslocation;
use App\Model\user;
use App\Services\Contactusers\ContactuserslocationService;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ContactuserslocationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['sendcontactmessageuser',]]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function personalmessagesannonces_locations(user $user)
    {
        if (auth()->user()->id === $user->id){

            return view('user.profile.contactuserlocation.personal_mailannonces_locations',[
                'user' => auth()->user()
            ]);

        }else{
            abort(404);
        }

    }

    public function apipersonalmessagesannonces_locations(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusers = ContactuserslocationService::apipersonalmessagesannonces_locations($user);

            return response()->json($contactusers, 200);
        }else{
            abort(404);
        }

    }

    public function apipersonalmessagesannonces_by_locations(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusers = ContactuserslocationService::apipersonalmessagesannonces_locations($user);

            return response()->json($contactusers, 200);
        }else{
            abort(404);
        }

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function apipersonalmessagesannonces_locations_show(user $user,contactuserslocation $contactuserslocation)
    {
        $this->authorize('update',$contactuserslocation);

        $contactuserslocations = ContactuserslocationService::apipersonalmessagesannonces_locations_show($user,$contactuserslocation);

        return response()->json($contactuserslocations, 200);
    }


    public function personalmessagesannonces_locations_show($user,contactuserslocation $contactuserslocation)
    {
        $this->authorize('update',$contactuserslocation);

        return view('user.profile.contactuserlocation.personal_mailannonces_locations_show',[
            'user' => auth()->user(),
            'contactuserslocation' => $contactuserslocation
        ]);
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
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function sendcontactmessageuser(StorecontactRequest $request, annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,annoncelocation $annoncelocation)
    {

        $contactuserslocation = new contactuserslocation();

        $slug = sha1(('YmdHis') . str_random(30));
        $contactuserslocation->fill($request->all());
        $contactuserslocation->slug = $slug;
        $contactuserslocation->user_id = $annoncelocation->user->id;
        $contactuserslocation->annoncelocation_id = $annoncelocation->id;

        ContactuserslocationService::newEmailToannoncelocationpageShow($request,$annoncelocation);

        $contactuserslocation->save();

        return response()->json($contactuserslocation,200);
    }

    public function personalmessagescontactsactive($id)
    {
        $contactuserslocation = contactuserslocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuserslocation);

        if(auth()->user()->id === $contactuserslocation->user_id){
            $contactuserslocation->update([ 'status_red' => 0,]);
            return response('read confirmed',Response::HTTP_ACCEPTED);
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function personalmessagesdelete(contactuserslocation $contactuserslocation,$id)
    {
        $contactuserslocation = contactuserslocation::findOrFail($id);

        $this->authorize('update',$contactuserslocation);

        if (auth()->user()->id === $contactuserslocation->user_id){
            $contactuserslocation->delete();
            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }

    }
}
