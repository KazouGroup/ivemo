<?php

namespace App\Models\favorite;

use App\Models\annoncelocation;
use App\Models\user;
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
