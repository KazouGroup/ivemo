<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class avisuser extends Model
{
    protected $guarded = [];



    public function from()
    {
        return $this->belongsTo(user::class, 'from_id');
    }

    public function to()
    {
        return $this->belongsTo(user::class, 'to_id');
    }

    protected $casts = [
        'status' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $myslug = Str::uuid();
            if (auth()->check()){
                $model->slug = $myslug;
            }
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->slug = Str::uuid();;
            }
        });
    }

    public function responseavisusers()
    {
        return $this->hasMany(responseavisuser::class, 'avisuser_id');
    }
}
