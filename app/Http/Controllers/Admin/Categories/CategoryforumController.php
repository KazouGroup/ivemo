<?php

namespace App\Http\Controllers\Admin\Categories;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryforumResource;
use App\Models\categoryforum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response;

class CategoryforumController extends Controller
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
        return view('admin.categories.categoryforum');
    }

    public function api()
    {

        $categoryforums =  CategoryforumResource::collection(categoryforum::with('user')
            ->withCount('forums')
            ->distinct()->get());

        return response()->json($categoryforums,200);
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
            'name'=>'required|string|min:2|max:100|unique:categoryforums',
            'label'=>'required|string|min:2|max:100',
            'photo'=> "required",
        ]);

        $categoryforum = new categoryforum();
        $categoryforum->fill($request->all());

        if ($request->photo) {
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/categories/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            $destinationPath = public_path("assets/img/categories/{$name}");
            Image::make($request->photo)->fit(1400,650)->save($destinationPath);

            $myfilename = "/assets/img/categories/{$name}";
            $categoryforum->photo = $myfilename;
        }
        $categoryforum->save();


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
            'name'=> "required|string|min:2|max:100|unique:categoryforums,name,{$id}",
            'label'=>'required|string|min:2|max:100',
            'photo'=> "required",
        ]);

        $categoryforum = categoryforum::findOrFail($id);


        $currentPhoto = $categoryforum->photo;

        if ($request->photo != $currentPhoto){
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/categories/';
            if(!file_exists($dir)){mkdir($dir, 0775, true);}
            Image::make($request->photo)->fit(1000,900)->save(public_path('assets/img/categories/').$name);
            $request->merge(['photo' =>  "/assets/img/categories/{$name}"]);
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }

        $categoryforum->slug = null;

        $categoryforum->update($request->all());

        return ['message' => 'data has ben updated'];
    }

    public function activated($id)
    {
        $categoryforum = categoryforum::where('id', $id)->findOrFail($id);

        $categoryforum->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $categoryforum = categoryforum::where('id', $id)->findOrFail($id);

        $categoryforum->update(['status' => 0,]);

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
        $categoryforum = categoryforum::findOrFail($id);
        $oldFilename = $categoryforum->photo;
        File::delete(public_path($oldFilename));
        $categoryforum->delete();

        return ['message' => 'Deleted successfully '];
    }
}
