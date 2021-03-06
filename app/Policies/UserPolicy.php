<?php

namespace App\Policies;

use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function update(user $user, user $model)
    {
        return auth()->user()->id === $model->id;
    }
}
