<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class uploadimage extends Model
{

    protected $guarded = [];

    protected $table = 'uploadimages';


    protected $casts = [
        'status' => 'boolean',
    ];

    public function uploadimagealable()
    {
        return $this->morphTo();
    }
}
