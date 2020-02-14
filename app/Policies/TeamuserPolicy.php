<?php

namespace App\Policies;

use App\Model\teamuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class TeamuserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\teamuser  $teamuser
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, teamuser $teamuser)
    {
        return auth()->user()->id === $teamuser->user_id;
    }
}
