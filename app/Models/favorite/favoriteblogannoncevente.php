<?php

namespace App\Models\favorite;

use App\Models\blogannoncevente;
use App\Models\user;
use Illuminate\Database\Eloquent\Model;

class favoriteblogannoncevente extends Model
{
    protected $guarded = [];

    protected  $table = 'favoriteblogannonceventes';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function blogannoncevente()
    {
        return $this->belongsTo(blogannoncevente::class,'blogannoncevente_id');
    }
}
