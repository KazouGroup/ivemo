<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class signalannoncereservation extends Model
{
    protected $guarded = [];

    protected  $table = 'signalannoncereservations';

    public function annoncereservation()
    {
        return $this->belongsTo(annoncereservation::class,'annoncereservation_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }
}
