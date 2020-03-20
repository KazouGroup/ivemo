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

    public function apipersonalmessagescontacts(user $user)
    {

        if (auth()->user()->id === $user->id){

            $contactusers = ContactuserService::apipersonalmessagescontacts($user);

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
            $contactuser->update([ 'status_red' => 0,]);
            return response('read confirmed',Response::HTTP_ACCEPTED);
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
