<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConditionutilisationResource;
use App\Model\conditionutilisation;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConditionutilisationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','apisitesconditionutilisations']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.conditionutilisation.index');
    }

    public function api()
    {
        $conditionutilisations =  ConditionutilisationResource::collection(conditionutilisation::with('user')->latest()->get());

        return response()->json($conditionutilisations,200);
    }


    public function apisitesconditionutilisations()
    {
        $conditionutilisations =  ConditionutilisationResource::collection(conditionutilisation::with('user')
            ->where('status',1)->latest()->get());

        return response()->json($conditionutilisations,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.conditionutilisation.create');
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
            'title'=> "required|string|min:2|max:200|unique:conditionutilisations,title",
        ]);

        $inputs = $request->all();

        $conditionutilisation = conditionutilisation::create([
            'title' => $inputs['title'],
            'body' => $inputs['body'],
        ]);

        return response()->json($conditionutilisation,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $conditionutilisation = new ConditionutilisationResource(conditionutilisation::where('id', $id)->findOrFail($id));

        return response()->json($conditionutilisation,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  conditionutilisation  $conditionutilisation
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(conditionutilisation $conditionutilisation)
    {
        $data = [
            'conditionutilisation' => $conditionutilisation,
        ];
        return view('admin.conditionutilisation.show',$data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return array
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'title'=> "required|string|min:2|max:200|unique:conditionutilisations,title,{$id}",
        ]);

        $conditionutilisation = conditionutilisation::findOrFail($id);

        $conditionutilisation->slug = null;

        $conditionutilisation->update($request->all());

        return ['message' => 'data has ben updated'];
    }



    public function activated($id)
    {
        $conditionutilisation = conditionutilisation::where('id', $id)->findOrFail($id);

        $conditionutilisation->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $conditionutilisation = conditionutilisation::where('id', $id)->findOrFail($id);

        $conditionutilisation->update(['status' => 0,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array
     */
    public function destroy($id)
    {
        $conditionutilisation = conditionutilisation::findOrFail($id);
        $conditionutilisation->delete();

        return ['message' => 'Deleted successfully '];
    }
}
