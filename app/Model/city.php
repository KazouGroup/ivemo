<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class city extends Model
{
    protected $table = 'cities';
    protected $fillable = [
        'name',
        'user_id',
        'slug',
        'status',
        'photo',
        'city_vip',
    ];


    public function user()
    {
        return $this->belongsTo(user::class, 'user_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
            $model->slug = str_slug($model->name);
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
            $model->slug = str_slug($model->name);
        });
    }

    protected $casts = [
        'status' => 'boolean',
        'city_vip' => 'boolean',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function annoncelocations()
    {
        return $this->hasMany(annoncelocation::class, 'city_id');
    }

    public function annonceventes()
    {
        return $this->hasMany(annoncevente::class, 'city_id');
    }

    public function annoncereservations()
    {
        return $this->hasMany(annoncereservation::class, 'city_id');
    }

    public function employments()
    {
        return $this->hasMany(employment::class, 'city_id');
    }
}
