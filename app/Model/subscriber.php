<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class subscriber extends Model
{

    protected $guarded = [
        'created_at','updated_at'
    ];

    protected  $table = 'subscribers';

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    protected static function boot()
    {
        parent::boot();

        self::saving(function ($model){
            $model->ip = request()->ip();
        });
    }

}
