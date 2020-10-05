<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\blogannoncelocation;
use App\Models\contactuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlogannoncelocationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\blogannoncelocation  $blogannoncelocation
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, blogannoncelocation $blogannoncelocation)
    {
        return auth()->user()->id === $blogannoncelocation->user_id;
    }
}
