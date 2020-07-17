<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class signal extends Model
{
    protected $table = 'signals';

    protected $guarded = [];


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
            $model->ip = request()->ip();
        });

        static::updating(function($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
            $model->ip = request()->ip();
        });
    }

    public function signalable()
    {
        return $this->morphTo();
    }

}
