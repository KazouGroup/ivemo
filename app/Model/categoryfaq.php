<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Filesystem\Cache;

class categoryfaq extends Model
{

    protected $guarded = [];

    protected $table = 'categories_faqs';


    public function user()
    {
        return $this->belongsTo(User::class);
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


    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    public function faqs()
    {
        return $this->hasMany(faq::class,'commentable');
    }
}
