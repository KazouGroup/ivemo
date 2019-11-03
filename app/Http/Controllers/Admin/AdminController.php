<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Contracts\Auth\Guard;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $auth;

    public function __construct(Guard $auth){
        $this->middleware('auth');
        $this->auth = $auth;
    }

    public function index()
    {
        return view('admin.index');
    }
}
