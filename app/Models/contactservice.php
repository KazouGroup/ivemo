<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class contactservice extends Model
{
    protected $table = 'contactservices';

    protected $guarded = [];


    public function from()
    {
        return $this->belongsTo(user::class, 'from_id');
    }

    public function to()
    {
        return $this->belongsTo(user::class, 'to_id');
    }

    //public function contactserviceable()
    //{
    //    return $this->belongsTo(annoncelocation::class);
   // }

    protected $casts = [
        'status_red' => 'boolean',
        'status_archvement' => 'boolean',
        'status_favorite' => 'boolean'
    ];


    public function contactserviceable()
    {
        return $this->morphTo();
    }
}
