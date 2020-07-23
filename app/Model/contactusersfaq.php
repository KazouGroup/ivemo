<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class contactusersfaq extends Model
{
    protected $guarded = [];

    protected  $table = 'contactusersfaqs';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
            $model->slug = Str::uuid();

        });
    }

    public function categoryuser()
    {
        return $this->belongsTo(categoryuser::class,'categoryuser_id');
    }

    public function categoryobjet()
    {
        return $this->belongsTo(categoryobjet::class,'categoryobjet_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $casts = [
        'status_red' => 'boolean',
    ];
}
