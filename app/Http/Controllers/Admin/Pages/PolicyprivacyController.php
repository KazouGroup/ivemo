<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Resources\PolicyprivacyResource;
use App\Models\policyprivacy;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PolicyprivacyController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','apisitespolicyprivacies']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.policyprivacy.index');
    }

    public function api()
    {
        $policyprivacies =  PolicyprivacyResource::collection(policyprivacy::with('user')->latest()->get());

        return response()->json($policyprivacies,200);
    }


    public function apisitespolicyprivacies()
    {
        $policyprivacies =  PolicyprivacyResource::collection(policyprivacy::with('user')
            ->where('status',1)->latest()->get());

        return response()->json($policyprivacies,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.policyprivacy.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'title'=> "required|string|min:2|max:200|unique:policyprivacies,title",
        ]);

        $inputs = $request->all();

        $policyprivacy = policyprivacy::create([
            'title' => $inputs['title'],
            'body' => $inputs['body'],
        ]);

        return response()->json($policyprivacy,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $policyprivacy = new PolicyprivacyResource(policyprivacy::where('id', $id)->findOrFail($id));

        return response()->json($policyprivacy,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(policyprivacy $policyprivacy)
    {
        $data = [
            'policyprivacy' => $policyprivacy,
        ];
        return view('admin.policyprivacy.show',$data);
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
        $this->validate($request,[
            'title'=> "required|string|min:2|max:200|unique:policyprivacies,title,{$id}",
        ]);

        $policyprivacy = policyprivacy::findOrFail($id);

        $policyprivacy->slug = null;

        $policyprivacy->update($request->all());

        return ['message' => 'data has ben updated'];
    }



    public function activated($id)
    {
        $policyprivacy = policyprivacy::where('id', $id)->findOrFail($id);

        $policyprivacy->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $policyprivacy = policyprivacy::where('id', $id)->findOrFail($id);

        $policyprivacy->update(['status' => 0,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $policyprivacy = policyprivacy::findOrFail($id);
        $policyprivacy->delete();

        return ['message' => 'Deleted successfully '];
    }
}
