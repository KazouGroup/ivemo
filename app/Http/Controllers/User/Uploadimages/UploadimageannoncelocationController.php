<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use App\Http\Resources\Uploadimage\UploadimageActivitycityResource;
use App\Http\Resources\Uploadimage\UploadimageAnnoncelocationResource;
use App\Model\activitycity;
use App\Model\annoncelocation;
use App\Model\annoncetype;
use App\Model\categoryannoncelocation;
use App\Model\city;
use File;
use App\Model\uploadimage;
use App\Model\user;use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response;

class UploadimageannoncelocationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'getuploadimage',
        ]]);
    }


    public function getuploadimage(annoncetype $annoncetype,categoryannoncelocation $categoryannoncelocation,city $city,$user,annoncelocation $annoncelocation)
    {
        $uploadimages = UploadimageAnnoncelocationResource::collection($annoncelocation->uploadimages()
            ->where('status',1)
            ->whereIn('uploadimagealable_id',[$annoncelocation->id])
            ->where('uploadimagealable_type',annoncelocation::class)
            ->orderByDesc('created_at')->distinct()->get());

        return response()->json($uploadimages,200);
    }


    public function storeuploadimage(Request $request,activitycity $activitycity)
    {

        if ($request->photo) {
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/activitycity/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            $destinationPath = public_path("assets/img/activitycity/{$name}");
            Image::make($request->photo)->fit(1200,703)->save($destinationPath);

            $myfilename = "/assets/img/activitycity/{$name}";
        }

        $activitycity->uploadimages()->create([
            'photo' => $myfilename,
        ]);

        return response('Success',Response::HTTP_ACCEPTED);

    }

    public function updateuploadimage(Request $request,$activitycity,uploadimage $uploadimage)
    {
        $currentPhoto = $uploadimage->photo;

        if ($request->photo != $currentPhoto){
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/cities/';
            if(!file_exists($dir)){mkdir($dir, 0775, true);}
            Image::make($request->photo)->fit(1200,703)->save(public_path('assets/img/cities/').$name);
            $request->merge(['photo' =>  "/assets/img/cities/{$name}"]);
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }

        $uploadimage->update($request->all());

        return response('Success',Response::HTTP_ACCEPTED);

    }


    public function statusuploadimage(uploadimage $uploadimage)
    {
        $uploadimage->update(['status' => !$uploadimage->status,]);

        return response('Success',Response::HTTP_ACCEPTED);
    }

}
