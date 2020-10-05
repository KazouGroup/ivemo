<?php

namespace App\Policies;

use App\Models\contactuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactuserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\contactuser  $contactuser
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, contactuser $contactuser)
    {
        return auth()->user()->id === $contactuser->user_id;
    }
}
