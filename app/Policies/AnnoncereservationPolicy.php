<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\contactuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnnoncereservationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\annoncereservation  $annoncereservation
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, annoncereservation $annoncereservation)
    {
        return auth()->user()->id === $annoncereservation->user_id;
    }
}
