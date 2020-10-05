<?php

namespace App\Policies;

use App\Models\contactuser;
use App\Models\contactuserslocation;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactuserslocationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\contactuserslocation  $contactuserslocation
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, contactuserslocation $contactuserslocation)
    {
        return auth()->user()->id === $contactuserslocation->user_id;
    }
}
