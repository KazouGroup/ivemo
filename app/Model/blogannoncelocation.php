<?php

namespace App\Model;

use App\Model\favorite\favoriteblogannoncelocation;
use App\Traits\Likesdata;
use App\Traits\Purify;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use OwenIt\Auditing\Auditable as AuditableTrait;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Activitylog\Traits\LogsActivity;

class blogannoncelocation extends Model implements Auditable
{
    use Purify, AuditableTrait,LogsActivity;

    protected $guarded = [];

    protected static $logAttributes = ['title','red_time','ip','status','status_admin','member_id'];

    protected  $table = 'blogannoncelocations';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $myslug = Str::uuid();
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slugin = $myslug;
            }
        });

        static::updating(function($model){
            $model->ip = request()->ip();
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function isOnline()
    {
        return (bool) Cache::has('user-is-online-' . $this->user->id);
    }

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function member()
    {
        return $this->belongsTo(user::class,'member_id');
    }

    public function categoryannoncelocation()
    {
        return $this->belongsTo(categoryannoncelocation::class,'categoryannoncelocation_id');
    }

    public function visits()
    {
        return visits($this);
    }

    protected $casts = [
        'status' => 'boolean',
        'status_comments' => 'boolean',
        'status_admin' => 'boolean',
    ];


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

    public function bookmarked()
    {
        return (bool) favoriteblogannoncelocation::where('user_id', Auth::guard('web')->id())
            ->where('blogannoncelocation_id', $this->id)
            ->first();
    }

    public function likes()
    {
        return $this->morphMany(like::class ,'likeable');
    }

    public function likeked()
    {
        return (bool) like::where('user_id', Auth::guard('web')->id())
            ->where(['likeable_type' => 'App\Model\blogannoncelocation', 
            'likeable_id' => $this->id ])
            ->first();
    }
}
