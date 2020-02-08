<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class teamuser extends Model
{
    protected $guarded = [];

    protected  $table = 'teamusers';

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    protected $casts = [
        'status' => 'boolean',
    ];
}
