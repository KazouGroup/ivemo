<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class categoryannoncereservation extends Model
{
    protected $guarded = [];

    protected $table = 'categoryannoncereservations';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slug = str_slug($model->name);
            }
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slug = str_slug($model->name);
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $casts = [
        'status' => 'boolean',
    ];

    public function annoncereservations()
    {
        return $this->hasMany(annoncereservation::class, 'categoryannoncereservation_id');
    }

    public function blogannoncereservations()
    {
        return $this->hasMany(blogannoncereservation::class, 'categoryannoncereservation_id');
    }
}
