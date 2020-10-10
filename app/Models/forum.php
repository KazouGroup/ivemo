<?php

namespace App\Models;

use App\Traits\Favoritesdata;
use App\Traits\Likesdata;
use App\Traits\Purify;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Traits\LogsActivity;

class forum extends Model
{

    use  LogsActivity;

    protected $guarded = [];

    protected  $table = 'forums';

    public $dates = ['expired_at','created_at','updated_at'];

    protected $casts = [
        'status' => 'boolean',
        'status_admin' => 'boolean',
    ];


    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function categoryforum()
    {
        return $this->belongsTo(categoryforum::class,'categoryforum_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $myslug = Str::uuid();
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slugin = $myslug;
            }
            $model->ip = request()->ip();
        });
        static::updating(function($model){
            $model->ip = request()->ip();
        });
    }

    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->user->id);
    }

    public function visits()
    {
        return visits($this);
    }

    use Sluggable;
    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title',
                'separator' => '+'
            ]

        ];
    }

    public function comments()
    {
        return $this->morphMany(comment::class ,'commentable');
    }

    public function signals()
    {
        return $this->morphMany(signal::class ,'signalable');
    }

    public function likes()
    {
        return $this->morphMany(like::class ,'likeable');
    }

    public function likeked()
    {
        return (bool) like::where('user_id', Auth::guard('web')->id())
            ->where(['likeable_type' => forum::class,
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
            ->where(['favoriteable_type' => forum::class,
                'favoriteable_id' => $this->id ])
            ->first();
    }

}
