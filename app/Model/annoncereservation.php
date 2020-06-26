<?php

namespace App\Model;

use App\Model\favorite\favoriteannoncereservation;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class annoncereservation extends Model
{
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

    protected $casts = [
        'status' => 'boolean',
        'status_admin' => 'boolean',
        'status_wifi' => 'boolean',
        'status_parking' => 'boolean',
        'status_lunch' => 'boolean',
        'status_car_sharing' => 'boolean',
        'dry_cleaning' => 'boolean',
        'status_consiegerie' => 'boolean',
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

    //public function comments()
    //{
    //    return $this->morphMany(comment::class ,'commentable');
    //}

    public function reservations()
    {
        return $this->hasMany(reservation::class, 'annoncereservation_id');
    }

    public function imagereservations()
    {
        return $this->hasMany(imagereservation::class, 'annoncereservation_id');
    }

    public function signalannoncereservations()
    {
        return $this->hasMany(signalannoncereservation::class, 'annoncereservation_id');
    }

    public function bookmarked()
    {
        return (bool) favoriteannoncereservation::where('user_id', Auth::guard('web')->id())
            ->where('annoncereservation_id', $this->id)
            ->first();
    }
}
