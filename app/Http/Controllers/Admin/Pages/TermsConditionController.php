<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\TermsCondition\StoreRequest;
use App\Http\Requests\TermsCondition\UpdateRequest;
use App\Http\Resources\TermsConditionResource;
use App\Model\termscondition;
use Illuminate\Http\Request;

class TermsConditionController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','view']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.terms_condition.index');
    }

    public function api()
    {
        $termsconditions = TermsConditionResource::collection(termscondition::all());

        return response()->json($termsconditions,200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.terms_condition.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $inputs = $request->all();

        $termscondition = new termscondition();
        $termscondition->fill($inputs);
        $termscondition->save();

        return response()->json($termscondition);
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

    public function view($slug)
    {
        $termscondition = new TermsConditionResource(termscondition::where('slug',$slug)->first());

        return response()->json($termscondition,200);
    }

    public function vector($slug)
    {
        $termscondition = termscondition::where('slug',$slug)->first();
        return view('admin.faq.show', compact('termscondition'));
    }

    public function site($slug)
    {
        $termscondition = termscondition::where('slug',$slug)->first();
        return view('admin.faq.show', compact('termscondition'));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, $id)
    {
        $inputs = $request->all();
        $termscondition = termscondition::findOrFail($id);
        $termscondition->update($inputs);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $termscondition = termscondition::findOrFail($id);
        $termscondition->delete();

        return ['message' => 'Deleted successfully'];
    }
}
