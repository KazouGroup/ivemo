<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use App\Http\Resources\UploadimageResource;
use App\Models\annoncetype;
use App\Models\annoncereservation;
use App\Models\categoryannoncereservation;
use App\Models\city;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response;

class UploadimageannoncereservationController extends Controller
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


    public function getuploadimage(annoncetype $annoncetype,categoryannoncereservation $categoryannoncereservation,city $city,$user,annoncereservation $annoncereservation)
    {
        $uploadimages = UploadimageResource::collection($annoncereservation->uploadimages()
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('uploadimagealable_id',[$annoncereservation->id])
            ->where('uploadimagealable_type',annoncereservation::class)
            ->orderByDesc('updated_at')->distinct()->get());

        return response()->json($uploadimages,200);
    }


    public function storeuploadimage(Request $request,annoncereservation $annoncereservation)
    {
        if($request->photo){

            $image = $request->photo;
            $imageExt = explode(";",explode('/', $image)[1])[0];
            $imageName = sha1(date('YmdHis') . str_random(30)) . '.' . $imageExt;
            $filenametostore='img/reservation/'. $imageName;
            $imagedecode = base64_decode(explode(",", $image)[1]);


            $resized_image = Image::make($imagedecode)->fit(1200,703)->stream();
            Storage::disk('s3')->put($filenametostore, $resized_image, 'public');

            $myfilename = config('app.aws_url')."/img/reservation/{$imageName}";
        }

        $annoncereservation->uploadimages()->create([
            'photo' => $myfilename,
        ]);

        return response('Success',Response::HTTP_ACCEPTED);

    }


}
