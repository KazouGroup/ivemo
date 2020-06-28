<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class responsecomment extends Model
{
    protected $guarded = [];

    protected $table = 'responsecomments';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    protected $casts = [
        'status' => 'boolean',
    ];

    public function comment()
    {
        return $this->belongsTo(comment::class,'comment_id');
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
    }
}
