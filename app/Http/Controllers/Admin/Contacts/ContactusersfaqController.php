<?php

namespace App\Http\Controllers\Admin\Contacts;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactusersfaqResource;
use App\Model\contactusersadvert;
use App\Model\contactusersfaq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactusersfaqController extends Controller
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
        return view('admin.contacts.contactusersfaq.index');
    }

    public function api()
    {
        $contactusersfaqs =  ContactusersfaqResource::collection(contactusersfaq::with('categoryuser','categoryobjet')->latest()->paginate(40));

        return response()->json($contactusersfaqs,200);
    }


    public function datacount()
    {
        $contactusersfaqs = DB::table('contactusersfaqs')->count();

        return response()->json($contactusersfaqs,200);
    }

    public function dataactivecount()
    {
        $contactusersfaqs = contactusersfaq::where(['status_red' => 1])->get()->count();

        return response()->json($contactusersfaqs,200);

    }

    public function dataunactivecount()
    {
        $contactusersfaqs = contactusersfaq::where(['status_red' => 0])->get()->count();

        return response()->json($contactusersfaqs,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contactusersfaq = contactusersfaq::findOrFail($id);

        $contactusersfaq->delete();

        return ['message' => 'Deleted successfully '];
    }
}
