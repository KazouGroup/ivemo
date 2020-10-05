<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class signalblogannoncereservation extends Model
{
    protected $guarded = [];

    protected  $table = 'signalblogannoncereservations';

    public function blogannoncereservation()
    {
        return $this->belongsTo(blogannoncereservation::class,'blogannoncereservation_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }
}
