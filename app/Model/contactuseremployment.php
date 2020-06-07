<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class contactuseremployment extends Model
{
    protected $guarded = [];

    protected $table = 'contactuseremployments';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function employment()
    {
        return $this->belongsTo(employment::class,'employment_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
    protected $casts = [
        'status_red' => 'boolean',
    ];
}
