<?php

namespace App\Policies;

use App\Model\contactuser;
use App\Model\contactuserslocation;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactuserslocationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\contactuserslocation  $contactuserslocation
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, contactuserslocation $contactuserslocation)
    {
        return auth()->user()->id === $contactuserslocation->user_id;
    }
}
