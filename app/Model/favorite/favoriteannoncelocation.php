<?php

namespace App\Model\favorite;

use App\Model\annoncelocation;
use App\Model\user;
use Illuminate\Database\Eloquent\Model;

class favoriteannoncelocation extends Model
{
    protected $guarded = [];

    protected  $table = 'favoriteannoncelocations';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function annoncelocation()
    {
        return $this->belongsTo(annoncelocation::class,'annoncelocation_id');
    }
}
