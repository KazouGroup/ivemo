<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function about()
    {
        return view('user.about.index');
    }

    public function contact()
    {
        return view('user.contact.index'); 
    }

    public function annonce()
    {
        return view('user.annonce.index'); 
    }

    public function annonceshow()
    {
        return view('user.annonce.show'); 
    }

    public function annonceshowcreate()
    {
        return view('user.annonce.create');   
    }

    public function annonceshowvendrecreate()
    {
        return view('user.annonce.create_vendre');  
    }
}
