<?php
namespace App\Services;



use App\Http\Resources\CategoryemployementResource;
use App\Http\Resources\CityResource;
use App\Http\Resources\EmploymentResource;
use App\Jobs\NewemployementJob;
use App\Models\abonne\subscribemployment;
use App\Models\categoryemployment;
use App\Models\city;
use App\Models\employment;
use Illuminate\Support\Facades\Storage;
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
        $employments = EmploymentResource::collection($categoryemployment->employments()->with('user','city','categoryemployment','member')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('categoryemployment_id',[$categoryemployment->id])
            ->with(['user' => function ($q){$q->select('id','avatar','first_name','slug');},])
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
            ->distinct()->limit(30)->get());

        return $employments;
    }

    public static function apiemploymentsbycategorycount($categoryemployment)
    {
        $employments = categoryemployment::whereSlug($categoryemployment->slug)
            ->where(['status' => 1])
            ->withCount(['employments' => function ($q) use ($categoryemployment){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->with('user','city','categoryemployment','member')
                    ->whereIn('categoryemployment_id',[$categoryemployment->id]);
            }])->first();

        return $employments;
    }

    public static function apiemploymentbycity($request,$city)
    {
        $employments = EmploymentResource::collection($city->employments()->with('user','city','categoryemployment','member')
            ->where(['status' => 1,'status_admin' => 1])
            ->with(['user' => function ($q){$q->select('id','avatar','first_name','slug');},])
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->with('user','city','categoryemployment','member')
            ->whereIn('city_id',[$city->id])
            ->orderBy('created_at','DESC')->distinct()->limit(30)->offset($request->offset)->get());

        return $employments;
    }

    public static function apiemploymentbycitycount($city)
    {
        $employments = city::whereSlug($city->slug)
            ->where(['status' => 1])
            ->withCount(['employments' => function ($q) use ($city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->with('user','city','categoryemployment','member')
                    ->whereIn('city_id',[$city->id]);
            }])->first();

        return $employments;
    }

    public static function apiemploymentsbycategorybycity($request,$categoryemployment,$city)
    {
        $employments = EmploymentResource::collection(employment::with('user','city','categoryemployment','member')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('city_id',[$city->id])
            ->with(['user' => function ($q){$q->select('id','avatar','first_name','slug');},])
            ->whereIn('categoryemployment_id',[$categoryemployment->id])
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
            ->distinct()->limit(30)->offset($request->offset)->get());

        return $employments;
    }

    public static function apiemploymentsbycategorybycitycount($categoryemployment,$city)
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
            }])->first();

        return $employments;
    }


    public static function apiemploymentsbycategoryslug($categoryemployment,$city,$user,$employment)
    {
        $employment = new EmploymentResource(employment::whereSlug($employment->slug)
            ->with('user','city','categoryemployment','member')
            ->with(['user' => function ($q){$q
                ->with(['profile' => function ($q){$q->distinct()->get();},])
                ->select('id','phone','avatar','first_name','slug');},])
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryemployment_id',[$categoryemployment->id])
            ->where(['status_admin' => 1])->first());

        return $employment;
    }

    public static function apistatistique($user,$employment)
    {

        $employment = new EmploymentResource(employment::whereSlugin($employment)
            ->withCount(['contactuseremployments' => function ($q) use ($user){
                $q->with('employment','user')->whereIn('user_id',[$user->id]);},])
            ->whereIn('user_id',[$user->id])
            ->with(['contactuseremployments' => function ($q) use ($user){
                $q->with('employment','user')
                    ->whereIn('user_id',[$user->id])
                    ->with(['employment.user' => function ($q){$q->distinct()->get();}])
                    ->with(['employment.city' => function ($q){$q->distinct()->get();}])
                    ->with(['employment.categoryemployment' => function ($q){$q->distinct()->get();}])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])
            ->with('user','city','categoryemployment','member')
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])->first());

        return $employment;
    }

    public static function apiemploymentsinteresse($user)
    {
        $employments = EmploymentResource::collection($user->employments()->with('user','city','categoryemployment','member')
            ->where(['status' => 1,'status_admin' => 1])
            ->with(['user' => function ($q){$q
                ->with(['profile' => function ($q){$q->distinct()->get();},])
                ->select('id','phone','avatar','first_name','slug');},])
            ->whereIn('user_id',[$user->id])
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
            ->take(12)->distinct()->get());

        return $employments;
    }

    public static function apicategoryemploymentcount()
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

    public static function apicategoryemploymentcitycount(city $city)
    {
        $categoryemployments = CategoryemployementResource::collection(categoryemployment::with('user')
            ->where('status',1)
            ->withCount(['employments' => function ($q) use ($city){
                $q->with('user','city','categoryemployment','member')
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->orderBy('employments_count','desc')
            ->distinct()->get());

        return $categoryemployments;
    }

    public static function apicityemployment()
    {
        $cityemployments = CityResource::collection(city::with('user')
            ->where('status',1)
            ->withCount(['employments' => function ($q){
                $q->with('user','city','categoryemployment','member')
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->orderBy('employments_count','desc')
            ->distinct()->get());

        return $cityemployments;
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
        $employments = $user->employments()->with('user','city','categoryemployment','member')
            ->with(['user.profile' => function ($q){$q->distinct()->get();}])
            ->whereIn('user_id',[$user->id])
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->withCount(['contactservices' => function ($q) use ($user){
                $q->where(['status_red' => 0])->whereIn('to_id',[$user->id]);
            }])
            ->orderBy('created_at','DESC')
            ->distinct()->get();

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

    public static function sendMessageToUser($request)
    {
        $fromUser = auth()->user();

        $emailsubscribemployment = subscribemployment::with('user','member')
            ->whereIn('member_id',[$fromUser->id])
            ->distinct()->get();

        $emailuserJob = (new NewemployementJob($emailsubscribemployment,$fromUser));

        dispatch($emailuserJob);

    }

    public static function storeUploadImage($request,$employment,$myfilename)
    {
        if($request->photo){

            $image = $request->photo;
            $imageExt = explode(";",explode('/', $image)[1])[0];
            $imageName = sha1(date('YmdHis') . str_random(30)) . '.' . $imageExt;
            $filenametostore='img/employment/'. $imageName;
            $imagedecode = base64_decode(explode(",", $image)[1]);
            $disk = Storage::disk('s3');

            $resized_image = Image::make($imagedecode)->fit(1200,703)->stream();
            $disk->put($filenametostore, $resized_image, 'public');
            $myfilename = config('app.aws_url')."/img/employment/{$imageName}";

        }

        return $myfilename;

    }

    public static function updateUploadeImage($request,$employment)
    {

        $currentPhoto = $employment->photo;

        if($request->photo != $currentPhoto){

            $image = $request->photo;
            $imageExt = explode(";",explode('/', $image)[1])[0];
            $imageName = sha1(date('YmdHis') . str_random(30)) . '.' . $imageExt;
            $filenametostore='img/employment/'. $imageName;
            $imagedecode = base64_decode(explode(",", $image)[1]);
            $disk = Storage::disk('s3');

            $resized_image = Image::make($imagedecode)->fit(1200,703)->stream();
            $disk->put($filenametostore, $resized_image, 'public');
            $myfilename = config('app.aws_url')."/img/employment/{$imageName}";

            $request->merge(['photo' =>  $myfilename]);

            $oldFilename = $currentPhoto;
            if($disk->exists($oldFilename))
            $disk->delete($oldFilename);
        }

    }
}
