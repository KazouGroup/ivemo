<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivitycityResource;
use App\Models\activitycity;
use App\Models\city;
use Illuminate\Http\Request;

class ActivitycityController extends Controller
{

    public function apiactivitycityinteresse(city $city)
    {
        $activitycities = ActivitycityResource::collection($city->activitycities()
            ->with('user','city','uploadimages')
            ->whereIn('city_id',[$city->id])
            ->where(['status' => 1])
            ->orderByDesc('created_at')
            ->take(9)->get());

        return response()->json($activitycities,200);

    }

    public function apiactivitycityshow(city $city,activitycity $activitycity)
    {
        $activitycity = new ActivitycityResource(activitycity::whereSlug($activitycity->slug)
            ->with('user','city','uploadimages')
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
}
