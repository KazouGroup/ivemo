<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class categoryannoncevente extends Model
{
    protected $guarded = [];

    protected $table = 'categoryannonceventes';

    public function user()
    {
        return $this->belongsTo(user::class);
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

    public function getRouteKeyName()
    {
        return 'slug';
    }
    protected $casts = [
        'status' => 'boolean',
    ];

    public function annonceventes()
    {
        return $this->hasMany(annoncevente::class, 'categoryannoncevente_id');
    }

    public function blogannonceventes()
    {
        return $this->hasMany(blogannoncevente::class, 'categoryannoncevente_id');
    }
}
