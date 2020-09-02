<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Filesystem\Cache;
use Illuminate\Support\Facades\Auth;

class activitycity extends Model
{
    protected $guarded = [];

    protected $table = 'activitycities';


    protected $casts = [
        'status' => 'boolean',
        'status_comments' => 'boolean',
        'status_link_contact' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function city()
    {
        return $this->belongsTo(city::class,'city_id');
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
        });
    }

    public function visits()
    {
        return visits($this);
    }

    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    public function cities()
    {
        return $this->hasMany(faq::class,'city_id');
    }

    public function contactservices()
    {
        return $this->morphMany(contactservice::class ,'contactserviceable');
    }

    public function comments()
    {
        return $this->morphMany(comment::class ,'commentable');
    }

    public function uploadimages()
    {
        return $this->morphMany(uploadimage::class ,'uploadimagealable');
    }

    public function likes()
    {
        return $this->morphMany(like::class ,'likeable');
    }

    public function likeked()
    {
        return (bool) like::where('user_id', Auth::guard('web')->id())
            ->where(['likeable_type' => 'App\Model\activitycity',
                'likeable_id' => $this->id ])
            ->first();
    }

    public function favorites()
    {
        return $this->morphMany(favorite::class ,'favoriteable');
    }

    public function favoriteted()
    {
        return (bool) favorite::where('user_id', Auth::guard('web')->id())
            ->where(['favoriteable_type' => 'App\Model\activitycity',
                'favoriteable_id' => $this->id ])
            ->first();
    }
}
