<?php

namespace App\Http\Controllers\Admin\Contacts;

use App\Http\Controllers\Controller;
use App\Model\contactusersadvert;
use Illuminate\Http\Request;

class ContactusersadvertController extends Controller
{

    public function index()
    {
        return view('admin.pages.advert');
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
