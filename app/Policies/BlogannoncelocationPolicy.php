<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\blogannoncelocation;
use App\Model\contactuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlogannoncelocationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\blogannoncelocation  $blogannoncelocation
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, blogannoncelocation $blogannoncelocation)
    {
        return auth()->user()->id === $blogannoncelocation->user_id;
    }
}
