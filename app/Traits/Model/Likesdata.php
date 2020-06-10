<?php

namespace App\Traits\Model;

use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\like\likedblogannoncelocation;
use App\Model\like\likedblogannoncereservation;
use App\Model\like\likedblogannoncevente;

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

    public function likedblogannonceventes()
    {
        return $this->hasMany(likedblogannoncevente::class, 'user_id');
    }

    public function putlikedblogannonceventes()
    {
        return $this->belongsToMany(
            blogannoncevente::class,
            'likedblogannonceventes',
            'user_id',
            'blogannoncevente_id')
            ->withTimeStamps();
    }

    public function likedblogannoncelocations()
    {
        return $this->hasMany(likedblogannoncelocation::class, 'user_id');
    }

    public function putlikedblogannoncelocations()
    {
        return $this->belongsToMany(
            blogannoncelocation::class,
            'likedblogannoncelocations',
            'user_id',
            'blogannoncelocation_id')
            ->withTimeStamps();
    }




}
