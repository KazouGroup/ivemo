<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\Activitycity\StoreRequest;
use App\Http\Requests\Activitycity\UpdateRequest;
use App\Http\Resources\Admin\AdminActivitycityResource;
use App\Models\activitycity;
use App\Models\city;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class DashboardactivitycityController extends Controller
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

    public function datacount()
    {
        $activitycities = DB::table('activitycities')->count();

        return response()->json($activitycities,200);
    }

    public function dataactivecount()
    {
        $activitycities = activitycity::where(['status' => 1])->get()->count();

        return response()->json($activitycities,200);
    }

    public function dataunactivecount()
    {
        $activitycities = activitycity::where(['status' => 0])->get()->count();

        return response()->json($activitycities,200);
    }


    public function apiactivitycities()
    {
        $activitycities = AdminActivitycityResource::collection(activitycity::with('user','city','member','uploadimages')
            ->orderByDesc('created_at')
            ->distinct()->paginate(20));

        return response()->json($activitycities,200);

    }

    public function apiactivitycitiesbycity(city $city)
    {
        $activitycities = AdminActivitycityResource::collection($city->activitycities()
            ->with('user','city','uploadimages','member')
            ->whereIn('city_id',[$city->id])
            ->orderByDesc('created_at')
            ->distinct()->get());

        return response()->json($activitycities,200);

    }

    public function apiactivitycityshow(activitycity $activitycity)
    {
        $activitycity = new AdminActivitycityResource(activitycity::whereSlugin($activitycity->slugin)
            ->with('user','city','uploadimages')
           ->firstOrFail());

        return response()->json($activitycity,200);

    }

    public function activitycityshow(activitycity $activitycity)
    {
        $user = Auth::user();
        return view('admin.activitycity.show',[
            'user' => $user,
        ]);
    }

    public function activitycities()
    {
        $user = Auth::user();
        return view('admin.activitycity.index',[
            'user' => $user,
        ]);
    }

    public function activitycitynew()
    {
        $user = Auth::user();
        return view('admin.activitycity.index',[
            'user' => $user,
        ]);
    }

    public function activitycitiesbycity()
    {
        $user = Auth::user();
        return view('admin.activitycity.index',[
            'user' => $user,
        ]);
    }

    public function storeactivitycity(StoreRequest $request)
    {
        $activitycity= new activitycity();

        $activitycity->fill($request->all());

        $activitycity->description = clean($request->description);

        $activitycity->save();

        return ['redirect' => route('activitycityshow.dashboard',$activitycity->slugin)];

    }

    public function updateactivitycity(UpdateRequest $request,activitycity $activitycity)
    {

        $activitycity->description = $request->description;
        $activitycity->slug = null;
        $activitycity->update($request->all());

        return ['message' => 'updated successfully'];

    }

    public function activated(activitycity $activitycity)
    {
        $activitycity->update([
            'status' => 1,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated(activitycity $activitycity)
    {
        $activitycity->update([
            'status' => 0,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function destroy(activitycity $activitycity)
    {
        $activitycity->delete();

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }



}
