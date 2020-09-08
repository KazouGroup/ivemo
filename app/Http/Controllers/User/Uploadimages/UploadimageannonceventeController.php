<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use App\Http\Resources\UploadimageResource;
use App\Model\activitycity;
use App\Model\annoncelocation;
use App\Model\annoncetype;
use App\Model\annoncevente;
use App\Model\categoryannoncelocation;
use App\Model\categoryannoncevente;
use App\Model\city;
use File;
use App\Model\uploadimage;
use App\Model\user;use Illuminate\Http\Request;
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
            ->where('status',1)
            ->whereIn('uploadimagealable_id',[$annoncevente->id])
            ->where('uploadimagealable_type',annoncevente::class)
            ->orderByDesc('updated_at')->distinct()->get());

        return response()->json($uploadimages,200);
    }


    public function storeuploadimage(Request $request,annoncevente $annoncevente)
    {

        if ($request->photo) {
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/uploadimage/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            $destinationPath = public_path("assets/img/uploadimage/{$name}");
            Image::make($request->photo)->fit(1200,703)->save($destinationPath);

            $myfilename = "/assets/img/uploadimage/{$name}";
        }

        $annoncevente->uploadimages()->create([
            'photo' => $myfilename,
        ]);

        return response('Success',Response::HTTP_ACCEPTED);

    }


}
