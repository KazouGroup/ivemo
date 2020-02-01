<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class annoncetype extends Model
{
    protected $table = 'annoncetypes';
    protected $fillable = [
        'name',
        'user_id',
        'slug',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->slug = str_slug($model->name);
        });
        static::updating(function($model){
            $model->slug = str_slug($model->name);
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function annoncelocations()
    {
        return $this->hasMany(annoncelocation::class, 'annoncetype_id');
    }
}
