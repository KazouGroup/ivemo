<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\annoncereservation;
use App\Models\contactuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class AnnoncereservationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\annoncereservation  $annoncereservation
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, annoncereservation $annoncereservation)
    {
        return auth()->user()->id === $annoncereservation->user_id;
    }

    public function contactservicears(user $model, annoncereservation $annoncereservation)
    {

       // return auth()->user()->slug === $model->slug || Auth::id() === $annoncereservation->user_id;
    }
}
