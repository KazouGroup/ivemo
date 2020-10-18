<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class reservation extends Model
{

    protected $guarded = [];

    protected  $table = 'reservations';

    public function to_id()
    {
        return $this->belongsTo(user::class,'to_id');
    }

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

     protected $casts = [
            'status' => 'boolean',
        ];

    public function reservationable()
    {
        return $this->morphTo();
    }

}
