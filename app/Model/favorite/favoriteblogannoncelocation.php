<?php

namespace App\Model\favorite;

use App\Model\blogannoncelocation;
use App\Model\user;
use Illuminate\Database\Eloquent\Model;

class favoriteblogannoncelocation extends Model
{
    protected $guarded = [];

    protected  $table = 'favoriteblogannoncelocations';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function blogannoncelocation()
    {
        return $this->belongsTo(blogannoncelocation::class,'blogannoncelocation_id');
    }
}
