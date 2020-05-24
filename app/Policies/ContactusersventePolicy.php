<?php

namespace App\Policies;

use App\Model\contactuser;
use App\Model\contactuserslocation;
use App\Model\contactusersvente;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactusersventePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\contactusersvente  $contactusersvente
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, contactusersvente $contactusersvente)
    {
        return auth()->user()->id === $contactusersvente->user_id;
    }
}
