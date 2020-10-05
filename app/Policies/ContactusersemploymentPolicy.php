<?php

namespace App\Policies;

use App\Models\contactuser;
use App\Models\contactuseremployment;
use App\Models\contactuserslocation;
use App\Models\contactusersvente;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactusersemploymentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\contactuseremployment  $contactuseremployment
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, contactuseremployment $contactuseremployment)
    {
        return auth()->user()->id === $contactuseremployment->user_id;
    }
}
