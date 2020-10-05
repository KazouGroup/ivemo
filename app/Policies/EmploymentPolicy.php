<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\contactuser;
use App\Models\employment;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmploymentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\employment  $employment
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, employment $employment)
    {
        return auth()->user()->id === $employment->user_id;
    }
}
