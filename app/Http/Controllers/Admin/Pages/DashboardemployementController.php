<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogannoncelocationResource;
use App\Http\Resources\EmploymentResource;
use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\categoryemployment;
use App\Model\city;
use App\Model\employment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class DashboardemployementController extends Controller
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

    public function api()
    {
        $employments = EmploymentResource::collection(employment::with('user','city','categoryemployment','member')
            ->orderBy('created_at','DESC')->distinct()->paginate(30));

        return response()->json($employments,200);
    }

    public function categoryemployment(categoryemployment $categoryemployment)
    {
        $employments = categoryemployment::whereSlug($categoryemployment->slug)
            ->withCount(['employments' => function ($q)  use ($categoryemployment){
                $q->with('user','city','categoryemployment','member')
                    ->whereIn('categoryemployment_id',[$categoryemployment->id]);
            }])->with(['employments' => function ($q) use ($categoryemployment){
                $q->with('user','city','categoryemployment','member')
                    ->whereIn('categoryemployment_id',[$categoryemployment->id])
                    ->orderBy('created_at','DESC')->distinct()->get();},
            ])->first();

        return response()->json($employments, 200);
    }

    public function employmentcount()
    {
        $employments = DB::table('employments')->count();

        return response()->json($employments,200);
    }

    public function employmentbycategorycount(categoryemployment $categoryemployment)
    {
        $employments = employment::whereIn('categoryemployment_id',[$categoryemployment->id])->get()->count();

        return response()->json($employments,200);
    }

    public function employmentactivecount()
    {
        $employments = employment::where(['status' => 1,'status_admin' => 1])->get()->count();

        return response()->json($employments,200);
    }

    public function employmentactivebycategorycount(categoryemployment $categoryemployment)
    {
        $employments = employment::whereIn('categoryemployment_id',[$categoryemployment->id])
            ->where(['status' => 1])->get()->count();

        return response()->json($employments,200);
    }

    public function  employmentunactivecount()
    {
        $employments = employment::where(['status' => 0,'status_admin' => 1])->get()->count();

        return response()->json($employments,200);
    }

    public function employmentunactivebycategorycount(categoryemployment $categoryemployment)
    {
        $employments = employment::where(['status' => 0,'status_admin' => 1])
            ->whereIn('categoryemployment_id',[$categoryemployment->id])
            ->get()->count();

        return response()->json($employments,200);
    }

    public function index()
    {
        return view('admin.employments.index');
    }

    public function show(categoryemployment $categoryemployment)
    {
        return view('admin.employments.show',[
            'categoryemployment' => $categoryemployment,
        ]);
    }

    public function activated($id)
    {
        $employment = employment::where('id', $id)->findOrFail($id);

        $employment->update([
            'status_admin' => 1,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $employment = employment::where('id', $id)->findOrFail($id);

        $employment->update([
            'status_admin' => 0,
            'member_id' => auth()->user()->id,
        ]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }
}
