<?php

namespace App\Models\favorite;

use App\Models\blogannoncelocation;
use App\Models\user;
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
