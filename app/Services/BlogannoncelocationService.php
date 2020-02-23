<?php
namespace App\Services;



use App\Http\Resources\AnnoncelocationResource;
use App\Http\Resources\BlogannoncelocationResource;
use App\Model\annoncelocation;
use App\Model\blogannoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\city;
use App\Model\user;

class BlogannoncelocationService
{


    public static function apiannonceblogcategorylocations($categoryannoncelocation)
    {
        $blogannoncelocations = categoryannoncelocation::whereSlug($categoryannoncelocation->slug)
            ->with([
                'blogannoncelocations' => function ($q) use ($categoryannoncelocation){
                    $q->where('status',1)
                        ->with('user','categoryannoncelocation')
                        ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                        ->orderBy('created_at','DESC')->distinct()->paginate(30)->toArray();},
            ])->first();

        return $blogannoncelocations;
    }

    public static function apiblogannoncelocationinteresse($categoryannoncelocation)
    {
        $blogannoncelocation = $categoryannoncelocation->blogannoncelocations()->with('user','categoryannoncelocation')
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->orderByRaw('RAND()')
            ->where('status',1)
            ->take(3)->distinct()->get()->toArray();;

        return $blogannoncelocation;
    }

    public static function apiblogannonceslocationsbyuser($user)
    {
        $blogannoncelocations = user::whereSlug($user->slug)
            ->with(['blogannoncelocations' => function ($q) use ($user){
                $q->with('user','categoryannoncelocation')
                    ->whereIn('user_id',[$user->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->paginate(40)->toArray()
                ;},
            ])
            ->withCount(['annoncelocations' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncereservations' => function ($q) use ($user){
                $q ->whereIn('user_id',[$user->id]);
            }])->withCount(['annonceventes' => function ($q) use ($user){
                $q ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannonceventes' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->first();

        return $blogannoncelocations;
    }

    public static function apiannonceblogcategorylocationslug($categoryannoncelocation, $date,$blogannoncelocation)
    {
        $blogannoncelocation = new BlogannoncelocationResource(blogannoncelocation::whereDate('created_at',$date)
            ->whereSlug($blogannoncelocation)->where('status',1)->first());

        return $blogannoncelocation;
    }

    public static function show($blogannoncelocation)
    {
        $blogannoncelocation = new BlogannoncelocationResource(blogannoncelocation::whereSlugin($blogannoncelocation)->first());

        return $blogannoncelocation;
    }

}
