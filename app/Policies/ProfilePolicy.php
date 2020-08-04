<?php

namespace App\Policies;

use App\Model\profile;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProfilePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\user  $user
     * @param  \App\Model\profile  $profile
     * @return mixed
     */
    public function update(user $user, profile $profile)
    {
        return auth()->user()->id === $profile->user_id;
    }
}
