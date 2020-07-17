<?php

namespace App\Model;

use App\Traits\Favoritesdata;
use App\Traits\Likesdata;
use App\Traits\Purify;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Spatie\Activitylog\Traits\LogsActivity;

class forum extends Model
{

    use Purify, LogsActivity,Likesdata,Favoritesdata;

    protected $guarded = [];

    protected  $table = 'forums';

    protected $casts = [
        'status' => 'boolean',
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
}
