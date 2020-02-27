<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\blogannoncelocation;
use App\Model\blogannoncevente;
use App\Model\contactuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlogannonceventePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\blogannoncevente  $blogannoncevente
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, blogannoncevente $blogannoncevente)
    {
        return auth()->user()->id === $blogannoncevente->user_id;
    }
}
