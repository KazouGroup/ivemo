<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\annoncevente;
use App\Models\contactuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnnonceventePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\annoncevente  $annoncevente
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, annoncevente $annoncevente)
    {
        return auth()->user()->id === $annoncevente->user_id;
    }
}
