<?php

namespace App\Traits;

use App\Models\annoncelocation;
use App\Models\annoncereservation;
use App\Models\annoncevente;
use App\Models\blogannoncelocation;
use App\Models\blogannoncereservation;
use App\Models\blogannoncevente;
use App\Models\employment;
use App\Models\favorite\favoriteannoncelocation;
use App\Models\favorite\favoriteannoncereservation;
use App\Models\favorite\favoriteannoncevente;
use App\Models\favorite\favoriteblogannoncelocation;
use App\Models\favorite\favoriteblogannoncereservation;
use App\Models\favorite\favoriteblogannoncevente;
use App\Models\favorite\favoritemployment;

trait Favoritesuserdata
{



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
