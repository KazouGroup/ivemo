<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class contactusersreservation extends Model
{
    protected $guarded = [];

    protected  $table = 'contactusersreservations';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
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

    protected $casts = [
        'status_red' => 'boolean',
        'status_favorite' => 'boolean',
        'status_archvement' => 'boolean',
    ];
}
