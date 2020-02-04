<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class categoryannoncereservation extends Model
{
    protected $guarded = [];

    protected $table = 'categoryannoncereservations';

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
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

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function annoncereservations()
    {
        return $this->hasMany(annoncereservation::class, 'categoryannoncereservation_id');
    }
}
