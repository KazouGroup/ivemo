<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\contactuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlogannoncereservationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\blogannoncereservation  $blogannoncereservation
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, blogannoncereservation $blogannoncereservation)
    {
        return auth()->user()->id === $blogannoncereservation->user_id;
    }
}
