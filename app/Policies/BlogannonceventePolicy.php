<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\blogannoncelocation;
use App\Models\blogannoncevente;
use App\Models\contactuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlogannonceventePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\blogannoncevente  $blogannoncevente
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, blogannoncevente $blogannoncevente)
    {
        return auth()->user()->id === $blogannoncevente->user_id;
    }
}
