<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class signalannoncelocation extends Model
{
    protected $guarded = [];

    protected  $table = 'signalannoncelocations';

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
}
