<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class categoryannoncelocation extends Model
{
    protected $guarded = [];

    protected $table = 'categoryannoncelocations';

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


    public function annoncelocations()
    {
        return $this->hasMany(annoncelocation::class, 'categoryannoncelocation_id');
    }

    public function blogannoncelocations()
    {
        return $this->hasMany(blogannoncelocation::class, 'categoryannoncelocation_id');
    }
}
