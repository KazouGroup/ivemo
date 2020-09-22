<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use App\Http\Resources\UploadimageResource;
use App\Model\activitycity;
use App\Model\city;
use App\Model\uploadimage;
use App\Model\user;use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response;

class UploadimageactivitycityController extends Controller
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


    public function getuploadimage(city $city,activitycity $activitycity)
    {
        $uploadimages = UploadimageResource::collection( $activitycity->uploadimages()
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('uploadimagealable_id',[$activitycity->id])
            ->where('uploadimagealable_type',activitycity::class)
            ->orderByDesc('updated_at')->distinct()->get());

        return response()->json($uploadimages,200);
    }


    public function storeuploadimage(Request $request,activitycity $activitycity)
    {
        if($request->photo){

            $image = $request->photo;
            $imageExt = explode(";",explode('/', $image)[1])[0];
            $imageName = sha1(date('YmdHis') . str_random(30)) . '.' . $imageExt;
            $filenametostore='img/activitycity/'. $imageName;
            $imagedecode = base64_decode(explode(",", $image)[1]);


            $resized_image = Image::make($imagedecode)->fit(1200,703)->stream();
            Storage::disk('s3')->put($filenametostore, $resized_image, 'public');

            $myfilename = config('app.aws_url')."/img/activitycity/{$imageName}";
        }

        $activitycity->uploadimages()->create([
            'photo' => $myfilename,
        ]);

        return response('Success',Response::HTTP_ACCEPTED);

    }

}
