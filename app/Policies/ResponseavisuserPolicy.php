<?php

namespace App\Policies;

use App\Model\annoncelocation;
use App\Model\avisuser;
use App\Model\contactuser;
use App\Model\responseavisuser;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ResponseavisuserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\responseavisuser  $responseavisuser
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function update(user $user, responseavisuser $responseavisuser)
    {
        return auth()->user()->id === $responseavisuser->user_id;
    }
}
