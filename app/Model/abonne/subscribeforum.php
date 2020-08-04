<?php

namespace App\Model\abonne;

use App\Model\user;
use Illuminate\Database\Eloquent\Model;

class subscribeforum extends Model
{
    protected $guarded = [];

    protected  $table = 'subscribeforums';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function member()
    {
        return $this->belongsTo(user::class,'member_id');
    }
}
