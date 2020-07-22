<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class profileadmin extends Model
{
    protected $guarded = [];


 protected $casts = [
     'status_user' => 'boolean',
 ];

 public function user()
 {
     return $this->belongsTo(user::class,'user_id');
 }

 }
