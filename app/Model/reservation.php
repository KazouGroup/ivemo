<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class reservation extends Model
{

    protected $guarded = [];

    protected  $table = 'reservations';

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

     protected $casts = [
            'status' => 'boolean',
        ];

    public function annoncereservation()
    {
        return $this->belongsTo(annoncereservation::class,'annoncereservation_id');
    }


}
