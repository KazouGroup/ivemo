<?php

namespace App\Policies;

use App\Model\forum;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ForumPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\forum  $forum
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, forum $forum)
    {
        return auth()->user()->id === $forum->user_id;
    }
}
