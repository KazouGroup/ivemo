<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class contactusersadvert extends Model
{
    protected $guarded = [];

    protected  $table = 'contactusersadverts';

    protected $casts = [
        'status' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
        static::updating(function($model){
            $model->ip = request()->ip();
        });
    }
}
