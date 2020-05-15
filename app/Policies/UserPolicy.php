<?php

namespace App\Policies;

use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function update(user $user, user $model)
    {
        return auth()->user()->id === $model->id;
    }
}
