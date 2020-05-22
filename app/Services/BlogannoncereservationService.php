<?php
namespace App\Services;


use App\Http\Resources\BlogannoncereservationResource;
use App\Model\blogannoncereservation;
use App\Model\user;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

class BlogannoncereservationService
{

    public static function show($blogannoncereservation)
    {
        $blogannoncereservation = new BlogannoncereservationResource(blogannoncereservation::whereSlugin($blogannoncereservation)->first());

        return $blogannoncereservation;
    }

    public static function apiblogannoncesreservationsbyuser($user)
    {
        $blogannoncereservations = user::whereSlug($user->slug)
            ->with(['blogannoncereservations' => function ($q) use ($user){
                $q->with('user','categoryannoncereservation','member')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()->toArray()
                ;},
            ])->withCount(['subscriberusers' => function ($q){
                $q->whereIn('user_id',[auth()->user()->id]);
            }])->withCount(['teamusers' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncelocations' => function ($q) use ($user){
                $q->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncereservations' => function ($q) use ($user){
                $q->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annonceventes' => function ($q) use ($user){
                $q->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannonceventes' => function ($q) use ($user){
                $q->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->first();

        return $blogannoncereservations;
    }

    public static function apiblogannoncesreservationscategoryannoncereservationbyuser($user,$categoryannoncereservation)
    {

        $blogannoncereservations = HelpersService::helpersannonblogceteambyusercount($user)
            ->with(['blogannoncereservations' => function ($q) use ($user,$categoryannoncereservation){
                $q->with('user','categoryannoncereservation','member')
                    ->whereIn('user_id',[$user->id])
                    ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])->first();

        return $blogannoncereservations;
    }

    public static function storeUploadImage($request,$blogannoncereservation)
    {

        if ($request->photo) {
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/blogannoncereservation/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            $destinationPath = public_path("assets/img/blogannoncereservation/{$name}");
            Image::make($request->photo)->fit(1200,650)->save($destinationPath);

            $myfilename = "/assets/img/blogannoncereservation/{$name}";
            $blogannoncereservation->photo = $myfilename;
        }

    }


    public static function updateUploadeImage($request,$blogannoncereservation)
    {
        $currentPhoto = $blogannoncereservation->photo;

        if ($request->photo != $currentPhoto){
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/blogannoncereservation/';
            if(!file_exists($dir)){mkdir($dir, 0775, true);}
            Image::make($request->photo)->fit(1200,650)->save(public_path('assets/img/blogannoncereservation/').$name);
            $request->merge(['photo' =>  "/assets/img/blogannoncereservation/{$name}"]);
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }
    }


}
