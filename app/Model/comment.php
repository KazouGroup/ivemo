<?php

namespace App\Model;

use App\Traits\Likesdata;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class comment extends Model
{
    //use AuditableTrait;
    use Likesdata;

    protected $guarded = [];

    protected $table = 'comments';

    protected $with = ['user'];


    protected $casts = [
        'status' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(user::class);
    }

    public function isOnline()
    {
        return (bool) Cache::has('user-is-online-' . $this->user->id);
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

    public function commentable()
    {
        return $this->morphTo();
    }

    public function responsecomments()
    {
        return $this->hasMany(responsecomment::class, 'comment_id');
    }

}
