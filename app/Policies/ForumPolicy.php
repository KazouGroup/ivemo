<?php

namespace App\Policies;

use App\Models\forum;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ForumPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\forum  $forum
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, forum $forum)
    {
        return auth()->user()->id === $forum->user_id;
    }
}
