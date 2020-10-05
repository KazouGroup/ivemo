<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\contactuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnnoncelocationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\annoncelocation  $annoncelocation
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, annoncelocation $annoncelocation)
    {
        return auth()->user()->id === $annoncelocation->user_id;
    }
}
