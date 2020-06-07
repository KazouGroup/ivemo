<?php

namespace App\Http\Controllers\Admin\Categories;

use App\Http\Resources\CategoryWorkwithuseResource;
use App\Http\Controllers\Controller;
use App\Model\categoryfaq;
use App\Model\categoryworkwithus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryWorkwithusController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.categories.categoryworkwithuses');
    }

    public function api()
    {
        $categoryworkwithuses =  CategoryWorkwithuseResource::collection(categoryworkwithus::withCount('workwithuses')
            ->orderBy('created_at','DESC')->distinct()->get());

        return response()->json($categoryworkwithuses,200);
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
        $this->validate($request,[
            'name'=>'required|string|min:2|max:100|unique:categoryworkwithuses',
        ]);

        $categoryworkwithus = new categoryworkwithus;
        $categoryworkwithus->name = $request->name;
        $categoryworkwithus->label = $request->name;
        $categoryworkwithus->save();


        return response('Created',Response::HTTP_CREATED);
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
     * @return array
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'name'=> "required|string|min:2|max:100|unique:categoryworkwithuses,name,{$id}",
        ]);

        $categoryworkwithus = categoryworkwithus::findOrFail($id);

        $categoryworkwithus->slug = null;

        $categoryworkwithus->update($request->all());

        return ['message' => 'data has ben updated'];
    }


    public function activated($id)
    {
        $categoryworkwithus = categoryworkwithus::where('id', $id)->findOrFail($id);

        $categoryworkwithus->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $categoryworkwithus = categoryworkwithus::where('id', $id)->findOrFail($id);

        $categoryworkwithus->update(['status' => 0,]);

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
        $categoryworkwithus = categoryworkwithus::findOrFail($id);
        $categoryworkwithus->delete();

        return ['message' => 'Deleted successfully '];
    }
}
