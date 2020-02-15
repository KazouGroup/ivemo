<?php


namespace App\Services;


use Intervention\Image\Facades\Image;
use File;

class TeamuserService
{

    public static function storeUploadImage($request,$teamuser)
    {

        if ($request->photo) {
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/teamuser/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            $destinationPath = public_path("assets/img/teamuser/{$name}");
            Image::make($request->photo)->fit(400,400)->save($destinationPath);
            //Save Image to database
            $myfilename = "/assets/img/teamuser/{$name}";
            $teamuser->photo = $myfilename;
        }

    }

    public static function updateUploadeImage($request,$teamuser)
    {
        $currentPhoto = $teamuser->photo;

        if ($request->photo != $currentPhoto){
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/teamuser/';
            if(!file_exists($dir)){mkdir($dir, 0775, true);}
            Image::make($request->photo)->fit(400,400)->save(public_path('assets/img/teamuser/').$name);
            $request->merge(['photo' =>  "/assets/img/teamuser/{$name}"]);
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }
    }

}
