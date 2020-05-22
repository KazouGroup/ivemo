<?php
namespace App\Services;


use App\Http\Resources\BlogannoncelocationResource;
use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\user;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

class BlogannoncelocationService
{


    public static function apiannonceblogcategorylocations($categoryannoncelocation)
    {
        $blogannoncelocations = categoryannoncelocation::whereSlug($categoryannoncelocation->slug)
            ->where(['status' => 1])
            ->withCount(['blogannoncelocations' => function ($q) use ($categoryannoncelocation){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->with('user','categoryannoncelocation','member')
                    ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id]);
            }])
            ->with([
                'blogannoncelocations' => function ($q) use ($categoryannoncelocation){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                        ->with('user','categoryannoncelocation','member')
                        ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                        ->orderBy('created_at','DESC')->distinct()->get();},
            ])->first();

        return $blogannoncelocations;
    }

    public static function apiblogannoncelocationinteresse($categoryannoncelocation)
    {
        $blogannoncelocation = $categoryannoncelocation->blogannoncelocations()->with('user','categoryannoncelocation','member')
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->orderByRaw('RAND()')
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->where(['status' => 1,'status_admin' => 1])
            ->take(3)->distinct()->get();

        return $blogannoncelocation;
    }

    public static function apiblogannonceslocationsbyuser($user)
    {
        $blogannoncelocations = HelpersService::helpersannonblogceteambyusercount($user)
            ->with(['blogannoncelocations' => function ($q) use ($user){
                $q->with('user','categoryannoncelocation','member')
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])->first();

        return $blogannoncelocations;
    }

    public static function apiblogannonceslocationscategoryannoncelocationbyuser($user,$categoryannoncelocation)
    {
        $blogannoncelocations = HelpersService::helpersannonblogceteambyusercount($user)
            ->with(['blogannoncelocations' => function ($q) use ($user,$categoryannoncelocation){
                $q->with('user','categoryannoncelocation','member')
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id])
                    ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])->first();

        return $blogannoncelocations;
    }

    public static function apiannonceblogcategorylocationslug($categoryannoncelocation, $date,$blogannoncelocation)
    {
        $blogannoncelocation = new BlogannoncelocationResource(blogannoncelocation::whereDate('created_at',$date)
            ->whereSlug($blogannoncelocation->slug)
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->where(['status' => 1,'status_admin' => 1])->first());

        return $blogannoncelocation;
    }

    public static function show($blogannoncelocation)
    {
        $blogannoncelocation = new BlogannoncelocationResource(blogannoncelocation::whereSlugin($blogannoncelocation)->first());

        return $blogannoncelocation;
    }

    public static function storeUploadImage($request,$blogannoncelocation)
    {

        if ($request->photo) {
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/blogannoncelocation/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            $destinationPath = public_path("assets/img/blogannoncelocation/{$name}");
            Image::make($request->photo)->fit(1200,650)->save($destinationPath);

            $myfilename = "/assets/img/blogannoncelocation/{$name}";
            $blogannoncelocation->photo = $myfilename;
        }

    }

    public static function updateUploadeImage($request,$blogannoncelocation)
    {
        $currentPhoto = $blogannoncelocation->photo;

        if ($request->photo != $currentPhoto){
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/blogannoncelocation/';
            if(!file_exists($dir)){mkdir($dir, 0775, true);}
            Image::make($request->photo)->fit(1200,650)->save(public_path('assets/img/blogannoncelocation/').$name);
            $request->merge(['photo' =>  "/assets/img/blogannoncelocation/{$name}"]);
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }
    }

}
