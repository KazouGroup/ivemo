<?php

namespace App\Model\like;

use App\Model\blogannoncevente;
use App\Model\user;
use Illuminate\Database\Eloquent\Model;

class likedblogannoncevente extends Model
{
    protected $guarded = [];

    protected  $table = 'likedblogannonceventes';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function blogannoncevente()
    {
        return $this->belongsTo(blogannoncevente::class,'blogannoncevente_id');
    }
}
