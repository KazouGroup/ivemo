<?php

namespace App\Models\favorite;

use App\Models\annoncereservation;
use App\Models\user;
use Illuminate\Database\Eloquent\Model;

class favoriteannoncereservation extends Model
{
    protected $guarded = [];

    protected  $table = 'favoriteannoncereservations';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function annoncereservation()
    {
        return $this->belongsTo(annoncereservation::class,'annoncereservation_id');
    }
}
