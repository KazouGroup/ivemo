<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class periodeannonce extends Model
{
    protected $guarded = [];

    protected  $table = 'periodeannonces';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            if (auth()->check()){
                $model->slug = str_slug($model->name);
            }
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->slug = str_slug($model->name);
            }
        });
    }
}
