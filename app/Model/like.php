<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class like extends Model
{

    protected $guarded = [];

    protected $table = 'likes';


    public function user()
    {
        return $this->belongsTo(user::class);
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

    public function likeable()
    {
        return $this->morphTo();
    }
}
