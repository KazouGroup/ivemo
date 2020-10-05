<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use App\Http\Resources\UploadimageResource;
use App\Models\activitycity;
use App\Models\annoncelocation;
use App\Models\annoncetype;
use App\Models\categoryannoncelocation;
use App\Models\city;
use File;
use Illuminate\Support\Facades\Storage;
use App\Models\uploadimage;
use App\Models\user;
use Illuminate\Http\Request;
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
        $uploadimages = UploadimageResource::collection($annoncelocation->uploadimages()
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('uploadimagealable_id',[$annoncelocation->id])
            ->where('uploadimagealable_type',annoncelocation::class)
            ->orderByDesc('updated_at')->distinct()->get());

        return response()->json($uploadimages,200);
    }


    public function storeuploadimage(Request $request,annoncelocation $annoncelocation)
    {
        if($request->photo){

            $image = $request->photo;
            $imageExt = explode(";",explode('/', $image)[1])[0];
            $imageName = sha1(date('YmdHis') . str_random(30)) . '.' . $imageExt;
            $filenametostore='img/locations/'. $imageName;
            $imagedecode = base64_decode(explode(",", $image)[1]);


            $resized_image = Image::make($imagedecode)->fit(1200,703)->stream();
            Storage::disk('s3')->put($filenametostore, $resized_image, 'public');

            $myfilename = config('app.aws_url')."/img/locations/{$imageName}";
        }

        $annoncelocation->uploadimages()->create([
            'photo' => $myfilename,
        ]);

        return response('Success',Response::HTTP_ACCEPTED);

    }


}
