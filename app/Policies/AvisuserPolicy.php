<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\avisuser;
use App\Model\contactuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class AvisuserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\avisuser  $avisuser
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function updateTo(user $user, avisuser $avisuser)
    {
        return auth()->user()->id === $avisuser->to_id;
    }

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\avisuser  $avisuser
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function updateFrom(user $user, avisuser $avisuser)
    {
        return auth()->user()->id === $avisuser->from_id;
    }
}
