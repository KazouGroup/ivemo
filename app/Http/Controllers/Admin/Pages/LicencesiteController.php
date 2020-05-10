<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Resources\LicencesiteResource;
use App\Model\licencesite;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LicencesiteController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','apisiteslicencesites']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.licencesite.index');
    }

    public function api()
    {
        $licencesites =  LicencesiteResource::collection(licencesite::with('user')->latest()->get());

        return response()->json($licencesites,200);
    }


    public function apisiteslicencesites()
    {
        $licencesites =  LicencesiteResource::collection(licencesite::with('user')
            ->where('status',1)->latest()->get());

        return response()->json($licencesites,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.licencesite.create');
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
            'title'=> "required|string|min:2|max:200|unique:licencesites,title",
        ]);

        $inputs = $request->all();

        $licencesite = licencesite::create([
            'title' => $inputs['title'],
            'body' => $inputs['body'],
        ]);

        return response()->json($licencesite,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $licencesite = new LicencesiteResource(licencesite::where('id', $id)->findOrFail($id));

        return response()->json($licencesite,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  licencesite  $licencesite
     * @return \Illuminate\Http\Response
     */
    public function edit(licencesite $licencesite)
    {
        $data = [
            'licencesite' => $licencesite,
        ];
        return view('admin.licencesite.show',$data);
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
            'title'=> "required|string|min:2|max:200|unique:licencesites,title,{$id}",
        ]);

        $licencesite = licencesite::findOrFail($id);

        $licencesite->slug = null;

        $licencesite->update($request->all());

        return ['message' => 'data has ben updated'];
    }



    public function activated($id)
    {
        $licencesite = licencesite::where('id', $id)->findOrFail($id);

        $licencesite->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $licencesite = licencesite::where('id', $id)->findOrFail($id);

        $licencesite->update(['status' => 0,]);

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
        $licencesite = licencesite::findOrFail($id);
        $licencesite->delete();

        return ['message' => 'Deleted successfully '];
    }
}
