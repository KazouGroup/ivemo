<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class workwithus extends Model
{
    protected $guarded = [];

    protected $table = 'workwithuses';

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

    public function categoryworkwithus()
    {
        return $this->belongsTo(categoryworkwithus::class,'categoryworkwithus_id');
    }

    public function visits()
    {
        return visits($this);
    }

    protected $casts = [
        'status' => 'boolean',
    ];
}
