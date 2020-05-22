<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactuseremploymentRequest;
use App\Model\categoryemployment;
use App\Model\city;
use App\Model\contactuseremployment;
use App\Model\contactuserslocation;
use App\Model\employment;
use App\Model\user;
use App\Services\Contactusers\ContactuserslocationService;
use Symfony\Component\HttpFoundation\Response;

class ContactusersemploymentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['contactuseremployment','contactuserslocaction']]);
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

    public function personalmessagesarchvement_annonces_locations(user $user)
    {
        if (auth()->user()->id === $user->id){

            return view('user.profile.contactuserlocation.personal_mailannonces_locations',[
                'user' => auth()->user()
            ]);

        }else{
            abort(404);
        }

    }

    public function personalmessagesfavorite_annonces_locations(user $user)
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

    public function apipersonalmessagesarchvement_annonces_locations(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusers = ContactuserslocationService::apipersonalmessagesarchvement_annonces_locations($user);

            return response()->json($contactusers, 200);
        }else{
            abort(404);
        }

    }

    public function apipersonalmessagesfavorite_annonces_locations(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusers = ContactuserslocationService::apipersonalmessagesfavorite_annonces_locations($user);

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
    public function contactuseremployment(StorecontactuseremploymentRequest $request, $categoryemployment, $city,employment $employment)
    {
        $contactuseremployment = new contactuseremployment();

        $slug = sha1(('YmdHis') . str_random(30));
        $contactuseremployment->fill($request->all());
        $contactuseremployment->slug = $slug;
        $contactuseremployment->user_id = $employment->user->id;
        $contactuseremployment->employment_id = $employment->id;

        //ContactuserslocationService::newEmailToannoncelocationpageShow($request,$employment);

        $contactuseremployment->save();

        return response()->json($contactuseremployment,200);
    }

    public function contactuserslocaction(StorecontactuseremploymentRequest $request)
    {
        $contactuseremployment = new contactuseremployment();

        $slug = sha1(('YmdHis') . str_random(30));
        $contactuseremployment->fill($request->all());
        $contactuseremployment->slug = $slug;

        $contactuseremployment->save();

        return response()->json($contactuseremployment,200);
    }

    public function personalmessagescontactsactive($id)
    {
        $contactuserslocation = contactuserslocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuserslocation);

        if(auth()->user()->id === $contactuserslocation->user_id){
            $contactuserslocation->update([ 'status_red' => 1,]);
            return response('read confirmed',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunactive($id)
    {
        $contactuserslocation = contactuserslocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuserslocation);

        if(auth()->user()->id === $contactuserslocation->user_id){
            $contactuserslocation->update([ 'status_red' => 0,]);
            return response('read confirmed',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsfavorite($id)
    {
        $contactuserslocation = contactuserslocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuserslocation);

        if(auth()->user()->id === $contactuserslocation->user_id){
            $contactuserslocation->update([ 'status_favorite' => 1,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunfavorite($id)
    {
        $contactuserslocation = contactuserslocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuserslocation);

        if(auth()->user()->id === $contactuserslocation->user_id){
            $contactuserslocation->update([ 'status_favorite' => 0,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunarchvement($id)
    {
        $contactuserslocation = contactuserslocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuserslocation);

        if(auth()->user()->id === $contactuserslocation->user_id){
            $contactuserslocation->update([ 'status_archvement' => 0,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsarchvement($id)
    {
        $contactuserslocation = contactuserslocation::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuserslocation);

        if(auth()->user()->id === $contactuserslocation->user_id){
            $contactuserslocation->update([ 'status_archvement' => 1,]);
            return response('success response',Response::HTTP_ACCEPTED);
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
