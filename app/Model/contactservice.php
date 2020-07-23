<?php

namespace App\Model;

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

    protected $casts = [
        'status_red' => 'boolean',
        'status_archvement' => 'boolean',
        'status_favorite' => 'boolean'
    ];

    public function contactserviceable()
    {
        return $this->morphTo();
    }}