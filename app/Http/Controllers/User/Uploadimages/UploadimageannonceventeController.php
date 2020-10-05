<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use App\Http\Resources\UploadimageResource;
use App\Models\annoncetype;
use App\Models\annoncevente;
use App\Models\categoryannoncevente;
use App\Models\city;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response;

class UploadimageannonceventeController extends Controller
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


    public function getuploadimage(annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,$user,annoncevente $annoncevente)
    {
        $uploadimages = UploadimageResource::collection($annoncevente->uploadimages()
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('uploadimagealable_id',[$annoncevente->id])
            ->where('uploadimagealable_type',annoncevente::class)
            ->orderByDesc('updated_at')->distinct()->get());

        return response()->json($uploadimages,200);
    }


    public function storeuploadimage(Request $request,annoncevente $annoncevente)
    {
        if($request->photo){

            $image = $request->photo;
            $imageExt = explode(";",explode('/', $image)[1])[0];
            $imageName = sha1(date('YmdHis') . str_random(30)) . '.' . $imageExt;
            $filenametostore='img/ventes/'. $imageName;
            $imagedecode = base64_decode(explode(",", $image)[1]);


            $resized_image = Image::make($imagedecode)->fit(1200,703)->stream();
            Storage::disk('s3')->put($filenametostore, $resized_image, 'public');

            $myfilename = config('app.aws_url')."/img/ventes/{$imageName}";
        }

        $annoncevente->uploadimages()->create([
            'photo' => $myfilename,
        ]);

        return response('Success',Response::HTTP_ACCEPTED);

    }


}
