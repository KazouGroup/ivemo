<?php

namespace App\Traits\Model;

use App\Model\blogannoncereservation;
use App\Model\favorite\favoriteblogannoncereservation;
use App\Model\like\likedblogannoncereservation;

trait Likesdata
{

    public function likedblogannoncereservations()
    {
        return $this->hasMany(likedblogannoncereservation::class, 'user_id');
    }

    public function putlikedblogannoncereservations()
    {
        return $this->belongsToMany(
            blogannoncereservation::class,
            'likedblogannoncereservations',
            'user_id',
            'blogannoncereservation_id')->withTimeStamps();
    }




}
