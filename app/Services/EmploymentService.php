<?php
namespace App\Services;



use App\Http\Resources\CategoryemployementResource;
use App\Http\Resources\CityResource;
use App\Http\Resources\EmploymentResource;
use App\Jobs\ContactuserfornewemploymentJob;
use App\Model\categoryemployment;
use App\Model\city;
use App\Model\employment;
use App\Model\subscriberuser;
use Intervention\Image\Facades\Image;
use File;

class EmploymentService
{

    public static function show($employment)
    {
        $employment = new EmploymentResource(employment::whereSlugin($employment)->first());

        return $employment;
    }

    public static function apiemploymentsbycategory($categoryemployment)
    {
        $employments = categoryemployment::whereSlug($categoryemployment->slug)
            ->where(['status' => 1])
            ->withCount(['employments' => function ($q) use ($categoryemployment){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->with('user','city','categoryemployment','member')
                    ->whereIn('categoryemployment_id',[$categoryemployment->id]);
            }])
            ->with([
                'employments' => function ($q) use ($categoryemployment){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                        ->whereHas('city', function ($q) {$q->where('status',1);})
                        ->with('user','city','categoryemployment','member')
                        ->whereIn('categoryemployment_id',[$categoryemployment->id])
                        ->orderBy('created_at','DESC')->distinct()->paginate(40);},
            ])->first();

        return $employments;
    }

    public static function apiemploymentsbycategorybycity($categoryemployment,$city)
    {
        $employments = city::whereSlug($city->slug)
            ->where(['status' => 1])
            ->withCount(['employments' => function ($q) use ($categoryemployment,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->with('user','city','categoryemployment','member')
                    ->whereIn('city_id',[$city->id])
                    ->whereIn('categoryemployment_id',[$categoryemployment->id]);
            }])
            ->with([
                'employments' => function ($q) use ($categoryemployment,$city){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                        ->whereHas('city', function ($q) {$q->where('status',1);})
                        ->with('user','city','categoryemployment','member')
                        ->whereIn('city_id',[$city->id])
                        ->whereIn('categoryemployment_id',[$categoryemployment->id])
                        ->orderBy('created_at','DESC')->distinct()->get();},
            ])->first();

        return $employments;
    }


    public static function apiemploymentsbycategoryslug($categoryemployment,$city,$employment)
    {
        $employment = new EmploymentResource(employment::whereSlug($employment->slug)
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryemployment_id',[$categoryemployment->id])
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])
            ->where(['status' => 1,'status_admin' => 1])->first());

        return $employment;
    }

    public static function apiemploymentsinteresse($categoryemployment)
    {
        $employments = $categoryemployment->employments()->with('user','city','categoryemployment','member')
            ->whereIn('categoryemployment_id',[$categoryemployment->id])
            ->orderByRaw('RAND()')
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->where(['status' => 1,'status_admin' => 1])
            ->take(10)->distinct()->get();

        return $employments;
    }

    public static function apicategoryemployment()
    {
        $categoryemployments = CategoryemployementResource::collection(categoryemployment::with('user')
            ->where('status',1)
            ->withCount(['employments' => function ($q){
                $q->with('user','city','categoryemployment','member')
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('employments_count','desc')
            ->distinct()->get());

        return $categoryemployments;
    }

    public static function apiemploymentbycategorybycount($categoryemployment)
    {
        $categoryemploymentsbycity = CityResource::collection(city::with('user')
            ->where('status',1)
            ->withCount(['employments' => function ($q) use ($categoryemployment){
                $q->with('user','city','categoryemployment','member')
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('categoryemployment_id',[$categoryemployment->id])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('employments_count','desc')
            ->take(6)->distinct()->get());

        return $categoryemploymentsbycity;
    }

    public static function apiemploymentsbyuser($user)
    {
        $employments = HelpersService::helpersannonceteamcount($user)
            ->with(['employments' => function ($q) use ($user){
                $q->with('user','city','categoryemployment','member')
                    ->with(['user.profile' => function ($q){$q->distinct()->get();}])
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')
                    ->distinct()->get();
                },
            ])->first();

        return $employments;
    }

    public static function apiemploymentsbyusercategoryemployment($user,$categoryemployment)
    {
        $employments = HelpersService::helpersannonblogceteambyusercount($user)
            ->with(['employments' => function ($q) use ($user,$categoryemployment){
                $q->with('user','city','categoryemployment','member')
                    ->with(['user.profile' => function ($q){$q->distinct()->get();}])
                    ->whereIn('user_id',[$user->id])
                    ->whereIn('categoryemployment_id',[$categoryemployment->id])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')
                    ->distinct()->get();
                },
            ])->first();

        return $employments;
    }

    public static function employmentsbyusersrcount($user)
    {
        $employments = employment::with('user','city','categoryemployment','member')
            ->withCount('contactuseremployments')
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereIn('user_id',[$user->id]);

        return $employments;
    }

    public static function storeUploadImage($request,$employment)
    {

        if ($request->photo) {
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/employment/';
            if(!file_exists($dir)){
                mkdir($dir, 0775, true);
            }
            $destinationPath = public_path("assets/img/employment/{$name}");
            Image::make($request->photo)->fit(1200,650)->save($destinationPath);

            $myfilename = "/assets/img/employment/{$name}";
            $employment->photo = $myfilename;
        }

    }

    public static function sendMessageToUser($request)
    {
        $user = auth()->user();

        $emilSubscribers = subscriberuser::with('user')
            ->whereIn('user_id',[$user->id])
            ->distinct()->get();

        $subject = (config("app.name"))." New post de ".$user->first_name;
        $message = $user->first_name.' a posté un nouveau article <a href="'.route('public_profile_employments.site', $user->slug).'" class="btn btn-xs btn-primary"> Voir plus</a>';

        foreach ($emilSubscribers as $item) {
                $to[] = $item->user_email;continue;
        }

        $from = ['address' => $user->email , 'name' => $user->first_name];

        $emailToUser = (new ContactuserfornewemploymentJob($subject,$message,$to,$from));

        dispatch($emailToUser);

    }

    public static function updateUploadeImage($request,$employment)
    {
        $currentPhoto = $employment->photo;

        if ($request->photo != $currentPhoto){
            $namefile = sha1(date('YmdHis') . str_random(30));
            $name =   $namefile.'.' . explode('/',explode(':',substr($request->photo,0,strpos
                ($request->photo,';')))[1])[1];
            $dir = 'assets/img/employment/';
            if(!file_exists($dir)){mkdir($dir, 0775, true);}
            Image::make($request->photo)->fit(1200,650)->save(public_path('assets/img/employment/').$name);
            $request->merge(['photo' =>  "/assets/img/employment/{$name}"]);
            $oldFilename = $currentPhoto;
            File::delete(public_path($oldFilename));
        }
    }
}
