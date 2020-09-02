<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Http\Resources\Uploadimage\UploadimageActivitycityResource;
use App\Model\activitycity;
use App\Model\city;
use App\Model\comment;
use App\Model\responsecomment;
use App\Services\CommentAndResponseService;
use Illuminate\Http\Request;

class UploadimageactivitycityController extends Controller
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


    public function getuploadimage(city $city,activitycity $activitycity)
    {
        $uploadimages = UploadimageActivitycityResource::collection( $activitycity->uploadimages()
            ->where('status',1)
            ->whereIn('uploadimagealable_id',[$activitycity->id])
            ->where('uploadimagealable_type',activitycity::class)
            ->orderByDesc('created_at')->distinct()->get());

        return response()->json($uploadimages,200);
    }


}
