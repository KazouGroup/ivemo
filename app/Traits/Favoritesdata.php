<?php

namespace App\Traits;

use App\Model\favorite;
use Illuminate\Support\Facades\Auth;

trait Favoritesdata
{

    public function favorites()
    {
        return $this->morphMany(favorite::class ,'favoriteable');
    }

    public function favoriteted()
    {
        return (bool) favorite::where('user_id', Auth::guard('web')->id())
            ->where('favoriteable_id', $this->id)
            ->first();
    }



}
