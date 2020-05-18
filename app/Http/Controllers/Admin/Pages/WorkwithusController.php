<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactworkwithusRequest;
use App\Http\Resources\WorkwithusResource;
use App\Model\categoryworkwithus;
use App\Model\contactworkwithus;
use App\Model\workwithus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WorkwithusController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','apiwork_with_us','apiwork_with_uscategoryworkwithus','apiworkwithusescategoryworkwithus','apiworkwithusesworkwithusshow','apiwork_with_us_show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        return view('admin.workwithus.index',compact('user'));
    }

    public function workwithusescategoryworkwithus(categoryworkwithus $categoryworkwithus)
    {
        $user = auth()->user();
        return view('admin.workwithus.index',compact('user'));
    }

    public function workwithusesworkwithusshow(categoryworkwithus $categoryworkwithus,workwithus $workwithus)
    {
        $user = auth()->user();
        return view('admin.workwithus.show',compact('user','categoryworkwithus','workwithus'));
    }

    public function api()
    {
        $workwithuses = WorkwithusResource::collection(workwithus::with('user','categoryworkwithus','city')
            ->withCount('contactworkwithuses')->latest()->get());

        return response()->json($workwithuses,200);
    }

    public function apiwork_with_us()
    {
        $workwithuses = WorkwithusResource::collection(workwithus::with('user','categoryworkwithus','city')
            ->where('status',1)
            ->whereHas('categoryworkwithus', function ($q) {$q->where('status',1);})
            ->latest()->get());

        return response()->json($workwithuses,200);
    }

    public function apiworkwithusescategoryworkwithus(categoryworkwithus $categoryworkwithus)
    {
        $workwithuses = categoryworkwithus::whereSlug($categoryworkwithus->slug)
            ->with(['workwithuses' => function ($q) use ($categoryworkwithus){
                $q->with('user','categoryworkwithus','city')
                    ->withCount('contactworkwithuses')
                    ->whereIn('categoryworkwithus_id',[$categoryworkwithus->id])
                    ->orderBy('created_at','DESC')->distinct()->get();},
            ])->first();;

        return response()->json($workwithuses,200);
    }

    public function apiwork_with_uscategoryworkwithus(categoryworkwithus $categoryworkwithus)
    {
        $workwithuses = WorkwithusResource::collection(workwithus::with('user','categoryworkwithus','city')
            ->whereIn('categoryworkwithus_id',[$categoryworkwithus->id])
            ->whereHas('categoryworkwithus', function ($q) {$q->where('status',1);})
            ->where('status',1)->latest()->get());

        return response()->json($workwithuses,200);
    }

    public function apiworkwithusesworkwithusshow(categoryworkwithus $categoryworkwithus,workwithus $workwithus)
    {

        $workwithuses = new WorkwithusResource(workwithus::whereSlug($workwithus->slug)
            ->where(['status' => 1])
            ->withCount('contactworkwithuses')
            ->with(['contactworkwithuses' => function ($q) use ($categoryworkwithus,$workwithus){
                $q->with('workwithus')
                    ->with(['workwithus.city' => function ($q){
                            $q->distinct()->get();}])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])->first());

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

    public function activated($id)
    {
        $workwithus = workwithus::where('id', $id)->findOrFail($id);

        $workwithus->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $workwithus = workwithus::where('id', $id)->findOrFail($id);

        $workwithus->update(['status' => 0,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function activatedcontactworkwithus($id)
    {
        $contactworkwithus = contactworkwithus::where('id', $id)->findOrFail($id);

        $contactworkwithus->update(['status_red' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivatedcontactworkwithus($id)
    {
        $contactworkwithus = contactworkwithus::where('id', $id)->findOrFail($id);

        $contactworkwithus->update(['status_red' => 0,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $workwithus = workwithus::findOrFail($id);
        $workwithus->delete();

        return ['message' => 'Deleted successfully '];
    }
}
