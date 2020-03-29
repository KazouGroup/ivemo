<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Model\contactuser;
use App\Model\user;
use App\Services\Contactusers\ContactuserService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ContactusersController extends Controller
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

    public function personalmessagescontacts(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.contactuser.personal_mailcontacts',[
                'user' => auth()->user()
            ]);
        }else{
            return abort(404);
        }
    }

    public function personalmessagesarchvementcontacts(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.contactuser.personal_mailcontacts',[
                'user' => auth()->user()
            ]);
        }else{
            return abort(404);
        }

    }

    public function personalmessagesfavoritecontacts(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.contactuser.personal_mailcontacts',[
                'user' => auth()->user()
            ]);
        }else{
            return abort(404);
        }

    }


    public function apipersonalmessagescontacts(user $user)
    {

        if (auth()->user()->id === $user->id){

            $contactusers = ContactuserService::apipersonalmessagescontacts($user);

            return response()->json($contactusers, 200);
        }else{
            return redirect()->back();
        }

    }
    public function apipersonalmessagesarchvementcontacts(user $user)
    {

        if (auth()->user()->id === $user->id){

            $contactusers = ContactuserService::apipersonalmessagesarchvementcontacts($user);

            return response()->json($contactusers, 200);
        }else{
            return redirect()->back();
        }

    }

    public function apipersonalmessagesfavoritecontacts(user $user)
    {

        if (auth()->user()->id === $user->id){

            $contactusers = ContactuserService::apipersonalmessagesfavoritecontacts($user);

            return response()->json($contactusers, 200);
        }else{
            return redirect()->back();
        }

    }


    public function apipersonalmessagescontactsshow(user $user,contactuser $contactuser)
    {
        $this->authorize('update',$contactuser);

        $contactusers = contactuser::with('user')->whereSlug($contactuser->slug)->first();

        return response()->json($contactusers, 200);
    }

    public function personalmessagescontactsshow(user $user,contactuser $contactuser)
    {
        $this->authorize('update',$contactuser);

        return view('user.profile.contactuser.personal_mailcontacts_show',[
            'user' => auth()->user(),
            'contactuser' => $contactuser
        ]);
    }


    public function personalmessagescontactsactive($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuser);

        if(auth()->user()->id === $contactuser->user_id){
            $contactuser->update([ 'status_red' => 1,]);
            return response('activated confirmed',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunactive($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuser);

        if(auth()->user()->id === $contactuser->user_id){
            $contactuser->update([ 'status_red' => 0,]);
            return response('activated confirmed',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsarchvement($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuser);

        if(auth()->user()->id === $contactuser->user_id){
            $contactuser->update([ 'status_archvement' => 1,]);
            return response('archvement confirmed',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunararchvement($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuser);

        if(auth()->user()->id === $contactuser->user_id){
            $contactuser->update([ 'status_archvement' => 0,]);
            return response('unarchvement confirmed',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsfavorite($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuser);

        if(auth()->user()->id === $contactuser->user_id){
            $contactuser->update([ 'status_favorite' => 1,]);
            return response('favorite confirmed',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunfavorite($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactuser);

        if(auth()->user()->id === $contactuser->user_id){
            $contactuser->update([ 'status_favorite' => 0,]);
            return response('unfavorite confirmed',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagesdelete(contactuser $contactuser,$id)
    {
        $contactuser = contactuser::findOrFail($id);
        $this->authorize('update',$contactuser);
        if (auth()->user()->id === $contactuser->user_id){
            $contactuser->delete();
            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }

    }
}
