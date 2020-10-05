<?php

namespace App\Policies;

use App\Models\teamuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class TeamuserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\teamuser  $teamuser
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, teamuser $teamuser)
    {
        return auth()->user()->id === $teamuser->user_id;
    }
}
