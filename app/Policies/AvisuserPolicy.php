<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\avisuser;
use App\Models\contactuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class AvisuserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\avisuser  $avisuser
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function updateTo(user $user, avisuser $avisuser)
    {
        return auth()->user()->id === $avisuser->to_id;
    }

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\avisuser  $avisuser
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function updateFrom(user $user, avisuser $avisuser)
    {
        return auth()->user()->id === $avisuser->from_id;
    }
}
