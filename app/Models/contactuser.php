<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class contactuser extends Model
{
    protected $guarded = [];

    protected  $table = 'contactusers';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $casts = [
        'status_red' => 'boolean',
        'status_favorite' => 'boolean',
        'status_archvement' => 'boolean',
    ];
}
