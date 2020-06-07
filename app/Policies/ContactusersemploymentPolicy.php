<?php

namespace App\Policies;

use App\Model\contactuser;
use App\Model\contactuseremployment;
use App\Model\contactuserslocation;
use App\Model\contactusersvente;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactusersemploymentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\contactuseremployment  $contactuseremployment
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, contactuseremployment $contactuseremployment)
    {
        return auth()->user()->id === $contactuseremployment->user_id;
    }
}
