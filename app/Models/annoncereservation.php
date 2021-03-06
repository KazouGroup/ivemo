<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class annoncereservation extends Model
{

    use Sluggable;

    protected $guarded = [];

    protected  $table = 'annoncereservations';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $myslug = Str::uuid();
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slugin = $myslug;
                $model->ip = request()->ip();
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

    public function categoryannoncereservation()
    {
        return $this->belongsTo(categoryannoncereservation::class,'categoryannoncereservation_id');
    }

    public function city()
    {
        return $this->belongsTo(city::class,'city_id');
    }

    public function periodeannonce()
    {
        return $this->belongsTo(periodeannonce::class,'periodeannonce_id');
    }

    public function annoncetype()
    {
        return $this->belongsTo(annoncetype::class,'annoncetype_id');
    }

    public function visits()
    {
        return visits($this);
    }

    public $dates = ['expired_at','created_at','updated_at'];

    protected $casts = [
        'status' => 'boolean',
        'furniture' => 'boolean',
        'terrace' => 'boolean',
        'balcony' => 'boolean',
        'elevator' => 'boolean',
        'status_comments' => 'boolean',
        'status_admin' => 'boolean',
        'status_wifi' => 'boolean',
        'status_parking' => 'boolean',
        'status_lunch' => 'boolean',
        'status_car_sharing' => 'boolean',
        'dry_cleaning' => 'boolean',
        'status_consiegerie' => 'boolean',
    ];

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

    public function scopeStatusPublished($q)
    {
        return $q->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);});
    }

    public function comments()
    {
        return $this->morphMany(comment::class ,'commentable');
    }

    public function contactservices()
    {
        return $this->morphMany(contactservice::class ,'contactserviceable')
            ->orderByDesc('created_at');
    }

    public function reservations()
    {
        return $this->morphMany(reservation::class ,'reservationable')
            ->orderByDesc('created_at');
    }

    public function uploadimages()
    {
        return $this->morphMany(uploadimage::class ,'uploadimagealable')
            ->orderByDesc('created_at');
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
            ->where(['likeable_type' => annoncereservation::class,
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
            ->where(['favoriteable_type' => annoncereservation::class,
                'favoriteable_id' => $this->id ])
            ->first();
    }
}
