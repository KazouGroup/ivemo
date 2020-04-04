<?php

namespace App\Http\Controllers\Admin\Partials;

use App\categoryprofile;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryFaqResource;
use App\Model\categoryfaq;
use Illuminate\Http\Request;

class CategoryFaqController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','apicategoryprofiles']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.category_faq.index');
    }

    public function api()
    {
        $categories_faqs =  CategoryFaqResource::collection(categoryfaq::with('user')->latest()->get());

        return response()->json($categories_faqs,200);
    }

    public function apicategoryprofiles()
    {
        $categoryprofile =  categoryprofile::select('id','name', 'label')->get();

        return response()->json($categoryprofile,200);
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
