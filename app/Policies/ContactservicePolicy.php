<?php

namespace App\Policies;

use App\Model\contactservice;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactservicePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\contactservice  $contactservice
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, contactservice $contactservice)
    {
        return auth()->user()->id === $contactservice->to_id;
    }

}
