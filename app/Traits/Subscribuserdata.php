<?php

namespace App\Traits;

use App\Model\subscribannonce;
use Illuminate\Support\Facades\Auth;

trait Subscribuserdata
{

    public function subscribannonces()
    {
        return $this->morphMany(subscribannonce::class ,'subscribannonceable');
    }

    public function subscribannonced()
    {
        return (bool) subscribannonce::where('user_id', Auth::guard('web')->id())
            ->where('subscribannonceable_id', $this->id)
            ->first();
    }



}
