<?php

namespace App\Http\Controllers\Admin\Partials;

use App\Http\Resources\CityResource;
use App\Http\Resources\ColorResource;
use App\Model\city;
use App\Model\color;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use File;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response;

class CityController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','apiexterne']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.partials.city');
    }

    public function api()
    {
        $cities = CityResource::collection(city::with('user')
            ->withCount('annoncelocations')
            ->withCount('annoncereservations')
            ->withCount('annonceventes')
            ->withCount('employments')
            ->latest()->get());

        return response()->json($cities,200);
    }

    public function apiexterne()
    {
        $cities = CityResource::collection(city::with('user')->where('status',1)->latest()->get());

        return response()->json($cities,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response$
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
           'link_video'=> "required|url|min:2|max:255",
       ]);

       $city = new city();
       $city->fill($request->all());

       if ($request->photo) {
           $namefile = sha1(date('YmdHis') . str_random(30));
           $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
               ($request->photo,';')))[1])[1];
           $dir = 'assets/img/cities/';
           if(!file_exists($dir)){
               mkdir($dir, 0775, true);
           }
           $destinationPath = public_path("assets/img/cities/{$name}");
           Image::make($request->photo)->fit(1400,650)->save($destinationPath);

           $myfilename = "/assets/img/cities/{$name}";
           $city->photo = $myfilename;
       }
       $city->save();


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
    public function update(Request $request,$id)
    {
        $this->validate($request,[
            'name'=> "required|string|min:2|max:100|unique:cities,name,{$id}",
            'link_video'=> "required|url|min:2|max:255",
        ]);

        $city = city::findOrFail($id);

        $currentPhoto = $city->photo;

        if ($request->photo != $currentPhoto){
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/cities/';
            if(!file_exists($dir)){mkdir($dir, 0775, true);}
            Image::make($request->photo)->fit(1000,900)->save(public_path('assets/img/cities/').$name);
            $request->merge(['photo' =>  "/assets/img/cities/{$name}"]);
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }

        $city->slug = null;
        $city->update($request->all());

        return ['message' => 'data has ben updated'];

    }

    public function activated($id)
    {
        $city = city::where('id', $id)->findOrFail($id);

        $city->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $city = city::where('id', $id)->findOrFail($id);

        $city->update(['status' => 0,]);

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
        $city = city::findOrFail($id);
        $oldFilename = $city->photo;
        File::delete(public_path($oldFilename));
        $city->delete();

        return ['message' => 'Deleted successfully'];
    }

}
