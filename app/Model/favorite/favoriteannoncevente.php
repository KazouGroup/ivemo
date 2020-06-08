<?php

namespace App\Model\favorite;

use App\Model\annoncevente;
use App\Model\user;
use Illuminate\Database\Eloquent\Model;

class favoriteannoncevente extends Model
{
    protected $guarded = [];

    protected  $table = 'favoriteannonceventes';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function annoncevente()
    {
        return $this->belongsTo(annoncevente::class,'annoncevente_id');
    }
}
