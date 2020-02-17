<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\contactuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnnoncelocationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\annoncelocation  $annoncelocation
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, annoncelocation $annoncelocation)
    {
        return auth()->user()->id === $annoncelocation->user_id;
    }
}
