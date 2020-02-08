<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncereservationResource;
use App\Http\Resources\CategoryannoncelocationResource;
use App\Http\Resources\CategoryannoncereservationResource;
use App\Model\blogannoncereservation;
use App\Model\categoryannoncelocation;
use App\Model\categoryannoncereservation;
use Illuminate\Http\Request;

class BlogannoncereservationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','edit','update','destroy'
        ]]);
    }

    public function apiannonceblogcategoryreservation($categoryannoncereservation)
    {
        $blogannoncereservation = new CategoryannoncereservationResource(categoryannoncereservation::whereSlug($categoryannoncereservation)
            ->first());
        return response()->json($blogannoncereservation, 200);
    }

    public function apiblogannoncereservationinteresse(categoryannoncereservation $categoryannoncereservation)
    {
        $blogannoncereservation = $categoryannoncereservation->blogannoncereservations()->with('user','categoryannoncereservation')
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->orderBy('created_at','DESC')
            ->where('status',1)
            ->take(3)->distinct()->get()->toArray();
        return response()->json($blogannoncereservation, 200);
    }

    public function apiannonceblogcategoryreservationslug($categoryannoncereservation, $date, $blogannoncereservation)
    {
        $blogannoncereservation = new BlogannoncereservationResource(blogannoncereservation::whereDate('created_at',$date)->whereSlug($blogannoncereservation)
            ->where('status',1)->first());
        return response()->json($blogannoncereservation, 200);
    }

    public function annonceblogcategoryreservation(categoryannoncereservation $categoryannoncereservation)
    {
       return view('user.blog.blogannoncereservation.category',[
             'categoryannoncereservation' => $categoryannoncereservation,
        ]);
    }

    public function annonceblogcategoryreservationslug($categoryannoncereservation, $date,blogannoncereservation $blogannoncereservation)
    {
       return view('user.blog.blogannoncereservation.show',[
             'blogannoncereservation' => $blogannoncereservation,
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
