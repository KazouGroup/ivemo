<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class signaluseremployment extends Model
{
    protected $guarded = [];

    protected $table = 'signaluseremployments';

    public function employment()
    {
        return $this->belongsTo(employment::class,'employment_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }
}
