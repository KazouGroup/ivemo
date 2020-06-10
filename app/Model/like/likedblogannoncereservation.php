<?php

namespace App\Model\like;

use App\Model\user;
use App\Model\blogannoncereservation;
use Illuminate\Database\Eloquent\Model;

class likedblogannoncereservation extends Model
{
    protected $guarded = [];

    protected  $table = 'likedblogannoncereservations';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function blogannoncereservation()
    {
        return $this->belongsTo(blogannoncereservation::class,'blogannoncereservation_id');
    }
}
