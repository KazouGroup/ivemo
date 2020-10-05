<?php

namespace App\Policies;

use App\Models\comment;
use App\Models\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\comment  $comment
     * @param  \App\Models\user  $user
     * @return mixed
     */
    public function updateComment(user $user, comment $comment)
    {
        return auth()->user()->id === $comment->user_id;
    }


    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Models\comment  $comment
     * @param  \App\Models\user  $user
     * @return mixed
     */

    public function updateStatusAutor(user $user, comment $comment)
    {
        return auth()->user()->id === $comment->commentable->user_id;
    }

}
