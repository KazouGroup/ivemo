<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivitycityResource;
use App\Model\activitycity;
use App\Model\city;
use Illuminate\Http\Request;

class ActivitycityController extends Controller
{
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


    public function apiactivitycityinteresse(city $city)
    {
        $activitycities = ActivitycityResource::collection($city->activitycities()
            ->whereIn('city_id',[$city->id])
            ->where(['status' => 1])
            ->orderByDesc('created_at')
            ->take(9)->get());

        return response()->json($activitycities,200);

    }

    public function apiactivitycityshow(city $city,activitycity $activitycity)
    {
        $activitycity = new ActivitycityResource(activitycity::whereSlug($activitycity->slug)
            ->whereIn('city_id',[$city->id])
            ->where(['status' => 1])
           ->firstOrFail());

        return response()->json($activitycity,200);

    }

    public function activitycityshow(city $city,activitycity $activitycity)
    {
        return view('user.activitycity.activitycity_show',[
            'activitycity' => $activitycity,
        ]);
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
