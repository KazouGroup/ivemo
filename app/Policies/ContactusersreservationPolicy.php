<?php

namespace App\Policies;

use App\Models\contactuser;
use App\Models\contactuserslocation;
use App\Models\contactusersreservation;
use App\Models\contactusersvente;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactusersreservationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\contactusersreservation  $contactusersreservation
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, contactusersreservation $contactusersreservation)
    {
        return auth()->user()->id === $contactusersreservation->user_id;
    }
}
