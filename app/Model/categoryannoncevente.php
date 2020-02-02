<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class categoryannoncevente extends Model
{
    protected $guarded = [];

    protected $table = 'categoryannonceventes';

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

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function conseilventes()
    {
        return $this->hasMany(conseilvente::class, 'categoryannoncevente_id');
    }

    public function annonceventes()
    {
        return $this->hasMany(annoncevente::class, 'categoryannoncevente_id');
    }
}
