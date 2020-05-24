<?php

namespace App\Http\Controllers\Admin\Categories;

use App\Model\categoryobjet;
use App\Model\categoryprofile;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryFaqResource;
use App\Model\categoryfaq;
use App\Model\categoryuser;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryFaqController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','apicategoryprofiles','apicategoryusers','apicategoryobjets']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.categories.categoryfaq');
    }

    public function api()
    {
        $categories_faqs =  CategoryFaqResource::collection(categoryfaq::with('user')->latest()->get());

        return response()->json($categories_faqs,200);
    }

    public function apicategoryprofiles()
    {
        $categoryprofile =  categoryprofile::select('id','name', 'label')->get()->toArray();

        return response()->json($categoryprofile,200);
    }

    public function apicategoryusers()
    {
        $categoryusers =  categoryuser::select('id','name', 'label')->get();

        return response()->json($categoryusers,200);
    }

    public function apicategoryobjets()
    {
        $categoryobjets =  categoryobjet::select('id','name', 'label')->get();

        return response()->json($categoryobjets,200);
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
            'name'=>'required|string|min:2|max:100|unique:cities',
        ]);

        $categoryfaq = new categoryfaq;
        $categoryfaq->name = $request->name;
        $categoryfaq->save();


        return response('Created',Response::HTTP_CREATED);
    }

    public function status(categoryfaq $categoryfaq,$id)
    {
        $categoryfaq = categoryfaq::where('id', $id)->findOrFail($id);
        $categoryfaq->update(['status' => !$categoryfaq->status]);

        return response()->json($categoryfaq,200);
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
            'name'=> "required|string|min:2|max:100|unique:cities,name,{$id}",
        ]);

        $categoryfaq = categoryfaq::findOrFail($id);

        $categoryfaq->slug = null;

        $categoryfaq->update($request->all());

        return ['message' => 'data has ben updated'];
    }


    public function activated($id)
    {
        $categoryfaq = categoryfaq::where('id', $id)->findOrFail($id);

        $categoryfaq->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $categoryfaq = categoryfaq::where('id', $id)->findOrFail($id);

        $categoryfaq->update(['status' => 0,]);

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
        $categoryfaq = categoryfaq::findOrFail($id);
        $categoryfaq->delete();

        return ['message' => 'Deleted successfully '];
    }
}
