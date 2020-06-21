<?php

namespace App\Model\abonne;

use App\Model\user;
use Illuminate\Database\Eloquent\Model;

class subscribemployment extends Model
{
    protected $guarded = [];

    protected  $table = 'subscribemployments';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function member()
    {
        return $this->belongsTo(user::class,'member_id');
    }
}
