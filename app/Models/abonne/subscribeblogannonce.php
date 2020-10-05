<?php

namespace App\Models\abonne;

use App\Models\user;
use Illuminate\Database\Eloquent\Model;

class subscribeblogannonce extends Model
{
    protected $guarded = [];

    protected  $table = 'subscribeblogannonces';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function member()
    {
        return $this->belongsTo(user::class,'member_id');
    }
}
