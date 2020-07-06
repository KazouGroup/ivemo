<?php

namespace App\Model;

use App\Traits\Likesdata;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class responsecomment extends Model
{
    use Likesdata;

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
    }
}
