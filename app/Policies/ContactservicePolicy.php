<?php

namespace App\Policies;

use App\Models\contactservice;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactservicePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\contactservice  $contactservice
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, contactservice $contactservice)
    {
        return auth()->user()->id === $contactservice->to_id;
    }

}
