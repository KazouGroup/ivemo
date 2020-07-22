<?php

namespace App\Traits;

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\employment;
use App\Model\favorite\favoriteannoncelocation;
use App\Model\favorite\favoriteannoncereservation;
use App\Model\favorite\favoriteannoncevente;
use App\Model\favorite\favoriteblogannoncelocation;
use App\Model\favorite\favoriteblogannoncereservation;
use App\Model\favorite\favoriteblogannoncevente;
use App\Model\favorite\favoritemployment;

trait Favoritesuserdata
{


    public function favoritemployments()
    {
        return $this->hasMany(favoritemployment::class, 'user_id');
    }

    public function bookmarksfavoritemployments()
    {
        return $this->belongsToMany(employment::class, 'favoritemployments', 'user_id', 'employment_id')->withTimeStamps();
    }


    public function favoriteblogannoncelocations()
    {
        return $this->hasMany(favoriteblogannoncelocation::class, 'user_id');
    }

    public function bookmarksfavoriteblogannoncelocations()
    {
        return $this->belongsToMany(blogannoncelocation::class, 'favoriteblogannoncelocations', 'user_id', 'blogannoncelocation_id')->withTimeStamps();
    }


    public function favoriteblogannonceventes()
    {
        return $this->hasMany(favoriteblogannoncevente::class, 'user_id');
    }

    public function bookmarksfavoriteblogannonceventes()
    {
        return $this->belongsToMany(blogannoncevente::class, 'favoriteblogannonceventes', 'user_id', 'blogannoncevente_id')->withTimeStamps();
    }

    public function favoriteblogannoncereservations()
    {
        return $this->hasMany(favoriteblogannoncereservation::class, 'user_id');
    }

    public function bookmarksfavoriteblogannoncereservations()
    {
        return $this->belongsToMany(
            blogannoncereservation::class,
            'favoriteblogannoncereservation',
            'user_id',
            'blogannoncereservation_id')->withTimeStamps();
    }

    public function favoriteannoncelocations()
    {
        return $this->hasMany(favoriteannoncelocation::class, 'user_id');
    }

    public function bookmarksfavoriteannoncelocations()
    {
        return $this->belongsToMany(
            annoncelocation::class,
            'favoriteannoncelocations',
            'user_id',
            'annoncelocation_id')->withTimeStamps();
    }

    public function favoriteannonceventes()
    {
        return $this->hasMany(favoriteannoncevente::class, 'user_id');
    }

    public function bookmarksfavoriteannonceventes()
    {
        return $this->belongsToMany(
            annoncevente::class,
            'favoriteannonceventes',
            'user_id',
            'annoncevente_id')->withTimeStamps();
    }

    public function favoriteannoncereservations()
    {
        return $this->hasMany(favoriteannoncereservation::class, 'user_id');
    }

    public function bookmarksfavoriteannoncereservations()
    {
        return $this->belongsToMany(
            annoncereservation::class,
            'favoriteannoncereservations',
            'user_id',
            'annoncereservation_id')->withTimeStamps();
    }

}
