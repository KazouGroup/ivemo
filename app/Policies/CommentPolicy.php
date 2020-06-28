<?php

namespace App\Policies;

use App\Model\comment;
use App\Model\user;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\comment  $comment
     * @param  \App\Model\user  $user
     * @return mixed
     */
    public function updateComment(user $user, comment $comment)
    {
        return auth()->user()->id === $comment->user_id;
    }


    /**
     * Determine whether the user can update the technician.
     *
     * @param  \App\Model\comment  $comment
     * @param  \App\Model\user  $user
     * @return mixed
     */

    public function updateStatusAutor(user $user, comment $comment)
    {
        return auth()->user()->id === $comment->commentable->user_id;
    }

}
