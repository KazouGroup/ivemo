<?php

namespace App\Http\Controllers\Admin\Contacts;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactuserforadvertsResource;
use App\Model\contactusersadvert;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ContactusersadvertController extends Controller
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

    public function api()
    {
        $contactusersforadverts =  ContactuserforadvertsResource::collection(contactusersadvert::all());

        return response()->json($contactusersforadverts,200);
    }

    public function contactforadvertscount()
    {
        $contactusersforadverts = DB::table('contactusersadverts')->count();

        return response()->json($contactusersforadverts,200);
    }

    public function contactforadvertsredcount()
    {
        $contactusersforadverts = contactusersadvert::where(['status' => 1])->get()->count();

        return response()->json($contactusersforadverts,200);
    }

    public function contactforadvertsunredcount()
    {
        $contactusersforadverts = contactusersadvert::where(['status' => 0])->get()->count();

        return response()->json($contactusersforadverts,200);
    }

    public function index()
    {
        return view('admin.contacts.contactforadverts.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  contactusersadvert $contactusersadvert
     * @return array|\Illuminate\Http\Response
     */
    public function destroy(contactusersadvert $contactusersadvert)
    {
        $contactusersadvert = contactusersadvert::findOrFail($contactusersadvert->id);

        $contactusersadvert->delete();

        return ['message' => 'Deleted successfully '];
    }
}
