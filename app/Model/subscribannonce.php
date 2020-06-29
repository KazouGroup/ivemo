<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class subscribannonce extends Model
{
    protected $guarded = [];

    protected $table = 'subscribannonces';


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
    }

    public function subscribannonceable()
    {
        return $this->morphTo();
    }
}
