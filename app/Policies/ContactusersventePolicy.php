<?php

namespace App\Policies;

use App\Models\contactuser;
use App\Models\contactuserslocation;
use App\Models\contactusersvente;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactusersventePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\contactusersvente  $contactusersvente
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, contactusersvente $contactusersvente)
    {
        return auth()->user()->id === $contactusersvente->user_id;
    }
}
