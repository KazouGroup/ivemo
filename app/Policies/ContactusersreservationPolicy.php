<?php

namespace App\Policies;

use App\Model\contactuser;
use App\Model\contactuserslocation;
use App\Model\contactusersreservation;
use App\Model\contactusersvente;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactusersreservationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\contactusersreservation  $contactusersreservation
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, contactusersreservation $contactusersreservation)
    {
        return auth()->user()->id === $contactusersreservation->user_id;
    }
}
