<?php
namespace App\Services;


use App\Http\Resources\BlogannonceventeResource;
use App\Model\blogannoncevente;
use App\Model\categoryannoncevente;
use App\Model\user;
use Intervention\Image\Facades\Image;
use File;

class BlogannonceventeService
{

    public static function show($blogannoncevente)
    {
        $blogannoncevente = new BlogannonceventeResource(blogannoncevente::whereSlugin($blogannoncevente)->first());

        return $blogannoncevente;
    }

    public static function apiannonceblogcategoryvente($categoryannoncevente)
    {
        $blogannoncereseventes = BlogannonceventeResource::collection(blogannoncevente::with('user','categoryannoncevente','member')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
            ->distinct()->paginate(40));

        return $blogannoncereseventes;
    }

    public static function apiannonceblogcategoryventecount($categoryannoncevente)
    {
        $blogannoncereseventes = categoryannoncevente::whereSlug($categoryannoncevente->slug)->where(['status' => 1])
            ->withCount(['blogannonceventes' => function ($q)  use ($categoryannoncevente){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente','member')
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);});
            }])->first();

        return $blogannoncereseventes;
    }


    public static function apiblogsannonceventespublique($user)
    {
        $blogannoncereseventes = user::whereSlug($user->slug)
            ->with(['blogannonceventes' => function ($q) use ($user){
                $q->with('user','categoryannoncevente','member')
                    ->whereIn('user_id',[$user->id])
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->distinct()->get()->toArray()
                ;},
            ])
            ->withCount(['annoncelocations' => function ($q) use ($user){
                $q->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncereservations' => function ($q) use ($user){
                $q->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annonceventes' => function ($q) use ($user){
                $q->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannonceventes' => function ($q) use ($user){
                $q->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('user_id',[$user->id]);
            }])
            ->first();

        return $blogannoncereseventes;
    }

    public static function apiblogannoncesventesbyuser($user)
    {
        $blogannoncereseventes = HelpersService::helpersannonblogceteambyusercount($user)
            ->with(['blogannonceventes' => function ($q) use ($user){
                $q->with('user','categoryannoncevente','member')
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()->toArray()
                ;},
            ])->first();

        return $blogannoncereseventes;
    }

    public static function apiblogannoncesventescategoryannonceventebyuser($user,$categoryannoncevente)
    {
        $blogannoncereseventes = HelpersService::helpersannonblogceteambyusercount($user)
            ->with(['blogannonceventes' => function ($q) use ($user,$categoryannoncevente){
                $q->with('user','categoryannoncevente','member')
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id])
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])->first();

        return $blogannoncereseventes;
    }

    public static function storeUploadImage($request,$blogannonceresevente)
    {

        if ($request->photo) {
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/blogannonceresevente/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            $destinationPath = public_path("assets/img/blogannonceresevente/{$name}");
            Image::make($request->photo)->fit(1200,650)->save($destinationPath);

            $myfilename = "/assets/img/blogannonceresevente/{$name}";
            $blogannonceresevente->photo = $myfilename;
        }

    }

    public static function updateUploadeImage($request,$blogannonceresevente)
    {
        $currentPhoto = $blogannonceresevente->photo;

        if ($request->photo != $currentPhoto){
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/blogannonceresevente/';
            if(!file_exists($dir)){mkdir($dir, 0775, true);}
            Image::make($request->photo)->fit(1200,650)->save(public_path('assets/img/blogannonceresevente/').$name);
            $request->merge(['photo' =>  "/assets/img/blogannonceresevente/{$name}"]);
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }
    }
}
