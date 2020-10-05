<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class contactusersadvert extends Model
{
    protected $guarded = [];

    protected  $table = 'contactusersadverts';

    protected $casts = [
        'status_red' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->slug = sha1(('YmdHis') . str_random(30));
            $model->ip = request()->ip();
        });
    }


}
