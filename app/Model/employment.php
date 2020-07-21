<?php

namespace App\Model;

use App\Model\favorite\favoritemployment;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class employment extends Model
{
    protected $guarded = [];

    protected $table = 'employments';

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

    public function categoryemployment()
    {
        return $this->belongsTo(categoryemployment::class,'categoryemployment_id');
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
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
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

    public function visits()
    {
        return visits($this);
    }

    protected $casts = [
        'status' => 'boolean',
        'status_comments' => 'boolean',
        'status_admin' => 'boolean',
        'status_link_contact' => 'boolean',
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

    public function contactuseremployments()
    {
        return $this->hasMany(contactuseremployment::class, 'employment_id');
    }

    public function comments()
    {
        return $this->morphMany(comment::class ,'commentable');
    }

    public function signals()
    {
        return $this->morphMany(signal::class ,'signalable');
    }

    public function contactservices()
    {
        return $this->morphMany(contactservice::class ,'contactserviceable');
    }

    public function bookmarked()
    {
        return (bool) favoritemployment::where('user_id', Auth::id())
            ->where('employment_id', $this->id)
            ->first();
    }

    public function iscontactservice()
    {
        return (bool) contactservice::where('from_id', Auth::id())
            ->where(['contactserviceable_type' => 'App\Model\employment', 
            'contactserviceable_id' => $this->id ])
            ->first();
    }
}
