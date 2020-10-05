<?php

namespace App\Policies;

use App\Models\profile;
use App\Models\user;
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
     * @param  \App\Models\user  $user
     * @param  \App\Models\profile  $profile
     * @return mixed
     */
    public function update(user $user, profile $profile)
    {
        return auth()->user()->id === $profile->user->id;
    }
}
