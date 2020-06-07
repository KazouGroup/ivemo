<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\contactuser;
use App\Model\employment;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmploymentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\employment  $employment
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, employment $employment)
    {
        return auth()->user()->id === $employment->user_id;
    }
}
