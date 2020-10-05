<?php

namespace App\Models\favorite;

use App\Models\annoncevente;
use App\Models\user;
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
