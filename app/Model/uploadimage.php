<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class uploadimage extends Model
{

    /* Ce $fillable est très important ici a ne pas charger */

    protected $fillable = ['photo','status','status_admin'];

    protected $table = 'uploadimages';


    protected $casts = [
        'status' => 'boolean',
        'status_admin' => 'boolean',
    ];

    public function uploadimagealable()
    {
        return $this->morphTo();
    }
}
