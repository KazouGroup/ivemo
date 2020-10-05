<?php

namespace App\Models\favorite;

use App\Models\blogannoncereservation;
use App\Models\user;
use Illuminate\Database\Eloquent\Model;

class favoriteblogannoncereservation extends Model
{
    protected $guarded = [];

    protected  $table = 'favoriteblogannoncereservation';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function blogannoncereservation()
    {
        return $this->belongsTo(blogannoncereservation::class,'blogannoncereservation_id');
    }
}
