<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactworkwithusRequest;
use App\Http\Resources\WorkwithusResource;
use App\Model\categoryworkwithus;
use App\Model\workwithus;
use Illuminate\Http\Request;

class WorkwithusController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','apiwork_with_us','apiwork_with_uscategoryworkwithus','apiwork_with_us_show']]);
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

    public function apiwork_with_us()
    {
        $workwithuses = WorkwithusResource::collection(workwithus::with('user','categoryworkwithus','city')
            ->where('status',1)->latest()->get());

        return response()->json($workwithuses,200);
    }

    public function apiwork_with_uscategoryworkwithus(categoryworkwithus $categoryworkwithus)
    {
        $workwithuses = WorkwithusResource::collection(workwithus::with('user','categoryworkwithus','city')
            ->whereIn('categoryworkwithus_id',[$categoryworkwithus->id])
            ->where('status',1)->latest()->get());

        return response()->json($workwithuses,200);

    }

    public function apiwork_with_us_show(categoryworkwithus $categoryworkwithus,$workwithus)
    {
        $workwithuses = new WorkwithusResource(workwithus::whereSlug($workwithus)
            ->where(['status' => 1])->first());

        return response()->json($workwithuses,200);
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
