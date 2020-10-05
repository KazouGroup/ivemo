<?php

namespace App\Policies;

use App\Models\annoncelocation;
use App\Models\avisuser;
use App\Models\contactuser;
use App\Models\responseavisuser;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class ResponseavisuserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\responseavisuser  $responseavisuser
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function update(user $user, responseavisuser $responseavisuser)
    {
        return auth()->user()->id === $responseavisuser->user_id;
    }
}
