<?php

namespace App\Model\favorite;

use App\Model\user;
use App\Model\employment;
use Illuminate\Database\Eloquent\Model;

class favoritemployment extends Model
{
    protected $guarded = [];

    protected  $table = 'favoritemployments';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function employment()
    {
        return $this->belongsTo(employment::class,'employment_id');
    }

}
