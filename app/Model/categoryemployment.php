<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class categoryemployment extends Model
{
    protected $guarded = [];

    protected $table = 'categoryemployments';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slug = str_slug($model->name);
            }
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slug = str_slug($model->name);
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
    protected $casts = [
        'status' => 'boolean',
    ];

    public function employments()
    {
        return $this->hasMany(employment::class, 'categoryemployment_id');
    }

}
