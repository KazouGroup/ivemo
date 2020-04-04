<?php

namespace App\Policies;

use App\Model\contactuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactuserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\contactuser  $contactuser
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, contactuser $contactuser)
    {
        return auth()->user()->id === $contactuser->user_id;
    }
}
