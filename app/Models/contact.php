<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;


class contact extends Model
{
    //use \OwenIt\Auditing\Auditable;

    protected $guarded = [];

    protected $table = 'contacts';

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model){
            $model->slug = sha1(('YmdHis') . str_random(30));
            $model->ip = request()->ip();
        });
    }

    protected $casts = [
        'status_red' => 'boolean',
        'status_archvement' => 'boolean',
        'status_favorite' => 'boolean'
    ];
}
