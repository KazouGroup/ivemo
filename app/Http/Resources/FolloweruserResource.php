<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FolloweruserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'member_id' => $this->member_id,
            'user' => $this->user,
            'member' => $this->member,
            //'statusOnline' => $this->isOnline(),
            'followeruser' => $this->followeruser(),
            'followinguser' => $this->followinguser(),


            'countfollowingusers' => $this->user->followingusers()->count(),
            'countfollowerusers' => $this->user->followerusers()->count(),

            'countfollowinguser_followingusers' => $this->member->followingusers()->count(),
            'countfollowinguser_followerusers' => $this->member->followerusers()->count(),

            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
