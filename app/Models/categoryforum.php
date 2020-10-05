<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class categoryforum extends Model
{

    protected $guarded = [];

    protected $table = 'categoryforums';


    protected $casts = [
        'status' => 'boolean',
    ];

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


    public function forums()
    {
        return $this->hasMany(forum::class,'categoryforum_id');
    }
}
