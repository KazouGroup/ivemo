<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\contactuser;
use App\Models\user;
use App\Services\Contactusers\ContactuserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $this->middleware('auth', ['except' => ['sendcontactmessageuser',]]);
    }

    public function personalmessagescontacts()
    {
        $user = Auth::user();

        $this->authorize('update', $user);

        return view('user.profile.contactuser.personal_mailcontacts', [
            'user' => auth()->user()
        ]);
    }

    public function personalmessagesarchvementcontacts(user $user)
    {
        $this->authorize('update', $user);

        return view('user.profile.contactuser.personal_mailcontacts', [
            'user' => auth()->user()
        ]);

    }

    public function personalmessagesfavoritecontacts(user $user)
    {
        $this->authorize('update', $user);

        return view('user.profile.contactuser.personal_mailcontacts', [
            'user' => auth()->user()
        ]);

    }

    public function apipersonalmessagescontacts()
    {
        $user = Auth::user();

        $this->authorize('update', $user);

        $contactusers = ContactuserService::apipersonalmessagescontacts($user);

        return response()->json($contactusers, 200);

    }

    public function apipersonalmessagesarchvementcontacts(user $user)
    {
        $this->authorize('update', $user);

        $contactusers = ContactuserService::apipersonalmessagesarchvementcontacts($user);

        return response()->json($contactusers, 200);

    }

    public function apipersonalmessagesfavoritecontacts(user $user)
    {
        $this->authorize('update', $user);

        $contactusers = ContactuserService::apipersonalmessagesfavoritecontacts($user);

        return response()->json($contactusers, 200);

    }


    public function apipersonalmessagescontactsshow(contactuser $contactuser)
    {
        $this->authorize('update', $contactuser);

        $contactusers = contactuser::with('user')->whereSlug($contactuser->slug)->first();

        return response()->json($contactusers, 200);
    }

    public function personalmessagescontactsshow(user $user, contactuser $contactuser)
    {
        $this->authorize('update', $contactuser);

        return view('user.profile.contactuser.personal_mailcontacts_show', [
            'user' => auth()->user(),
            'contactuser' => $contactuser
        ]);
    }


    public function personalmessagescontactsactive($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update', $contactuser);

        if (auth()->user()->id === $contactuser->user_id) {
            $contactuser->update(['status_red' => 1,]);
            return response('activated confirmed', Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunactive($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update', $contactuser);

        if (auth()->user()->id === $contactuser->user_id) {
            $contactuser->update(['status_red' => 0,]);
            return response('activated confirmed', Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsarchvement($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update', $contactuser);

        if (auth()->user()->id === $contactuser->user_id) {
            $contactuser->update(['status_archvement' => 1,]);
            return response('archvement confirmed', Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunararchvement($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update', $contactuser);

        if (auth()->user()->id === $contactuser->user_id) {
            $contactuser->update(['status_archvement' => 0,]);
            return response('unarchvement confirmed', Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsfavorite($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update', $contactuser);

        if (auth()->user()->id === $contactuser->user_id) {
            $contactuser->update(['status_favorite' => 1,]);
            return response('favorite confirmed', Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunfavorite($id)
    {
        $contactuser = contactuser::where('id', $id)->findOrFail($id);

        $this->authorize('update', $contactuser);

        if (auth()->user()->id === $contactuser->user_id) {
            $contactuser->update(['status_favorite' => 0,]);
            return response('unfavorite confirmed', Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagesdelete(contactuser $contactuser, $id)
    {
        $contactuser = contactuser::findOrFail($id);
        $this->authorize('update', $contactuser);
        if (auth()->user()->id === $contactuser->user_id) {
            $contactuser->delete();
            return ['message' => 'message deleted '];
        } else {
            abort(404);
        }

    }
}
