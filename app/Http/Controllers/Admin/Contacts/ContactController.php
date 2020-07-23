<?php

namespace App\Http\Controllers\Admin\Contacts;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use App\Model\contactusersadvert;
use App\Model\contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
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

    public function index()
    {
        return view('admin.contacts.contactadmin.index');
    }

    public function api()
    {
        $contacts =  ContactResource::collection(contact::latest()->paginate(40));

        return response()->json($contacts,200);
    }


    public function datacount()
    {
        $contacts = DB::table('contacts')->count();

        return response()->json($contacts,200);
    }

    public function dataactivecount()
    {
        $contacts = contact::where(['status_red' => 1])->get()->count();

        return response()->json($contacts,200);

    }

    public function dataunactivecount()
    {
        $contacts = contact::where(['status_red' => 0])->get()->count();

        return response()->json($contacts,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = contact::findOrFail($id);

        $contact->delete();

        return ['message' => 'Deleted successfully '];
    }
}
