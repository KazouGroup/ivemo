<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class categoryworkwithus extends Model
{
    protected $guarded = [];

    protected $table = 'categoryworkwithuses';

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
