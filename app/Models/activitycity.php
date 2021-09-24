<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Filesystem\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class activitycity extends Model
{
    use Sluggable;

    protected $fillable = ['description','link_video','slug','slugin','city_id','title','user_id','member_id','status'];

    protected $table = 'activitycities';

    protected $with = ['member'];

    public $dates = ['expired_at','created_at','updated_at'];

    protected $casts = [
        'status' => 'boolean',
        'status_comments' => 'boolean',
        'status_link_contact' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function member()
    {
        return $this->belongsTo(user::class,'member_id');
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
                $model->ip = request()->ip();
                $model->slugin = Str::uuid();
            }
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->ip = request()->ip();
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

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title',
                'separator' => '+'
            ]

        ];
    }

    public function cities()
    {
        return $this->hasMany(faq::class,'city_id');
    }

    public function contactservices()
    {
        return $this->morphMany(contactservice::class ,'contactserviceable')
            ->orderByDesc('created_at');
    }

    public function comments()
    {
        return $this->morphMany(comment::class ,'commentable')
            ->orderByDesc('created_at');
    }

    public function uploadimages()
    {
        return $this->morphMany(uploadimage::class ,'uploadimagealable')
            ->orderByDesc('created_at');
    }

    public function likes()
    {
        return $this->morphMany(like::class ,'likeable');
    }

    public function likeked()
    {
        return (bool) like::where('user_id', Auth::guard('web')->id())
            ->where(['likeable_type' => activitycity::class,
                'likeable_id' => $this->id ])
            ->first();
    }

    public function favorites()
    {
        return $this->morphMany(favorite::class ,'favoriteable')
            ->orderByDesc('created_at');
    }

    public function favoriteted()
    {
        return (bool) favorite::where('user_id', Auth::guard('web')->id())
            ->where(['favoriteable_type' => activitycity::class,
                'favoriteable_id' => $this->id ])
            ->first();
    }
}
