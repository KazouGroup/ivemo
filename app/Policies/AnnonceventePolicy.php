<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\annoncevente;
use App\Model\contactuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnnonceventePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\annoncevente  $annoncevente
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, annoncevente $annoncevente)
    {
        return auth()->user()->id === $annoncevente->user_id;
    }
}
