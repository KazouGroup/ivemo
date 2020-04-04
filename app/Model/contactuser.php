<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class contactuser extends Model
{
    protected $guarded = [];

    protected  $table = 'contactusers';

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function annoncelocation()
    {
        return $this->belongsTo(annoncelocation::class,'annoncelocation_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }

    public function annoncereservation()
    {
        return $this->belongsTo(annoncereservation::class,'annoncereservation_id');
    }

    public function annoncevente()
    {
        return $this->belongsTo(User::class,'annoncevente_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $casts = [
        'status_red' => 'boolean',
    ];
}
