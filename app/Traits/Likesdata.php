<?php

namespace App\Traits;

use App\Models\like;
use Illuminate\Support\Facades\Auth;

trait Likesdata
{

    public function likes()
    {
        return $this->morphMany(like::class ,'likeable');
    }

    public function likeked()
    {
        return (bool) like::where('user_id', Auth::guard('web')->id())
            ->where('likeable_id', $this->id)
            ->first();
    }



}
