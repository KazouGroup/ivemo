<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\blogannoncelocation;
use App\Models\blogannoncereservation;
use App\Models\contactuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlogannoncereservationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\blogannoncereservation  $blogannoncereservation
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, blogannoncereservation $blogannoncereservation)
    {
        return auth()->user()->id === $blogannoncereservation->user_id;
    }
}
