<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ForumResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'slugin' => $this->slugin,
            'user' => $this->user,
            'user_id' => $this->user_id,
            'likeked' => $this->likeked(),
            'countlikes' => $this->likes()->count(),
            'countcomments' => $this->comments()->count(),
            'status_comments' => $this->status_comments,
            'status_admin' => $this->status_admin,
            'favoriteted' => $this->favoriteted(),
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'statusOnline' => $this->isOnline(),
            'categoryforum' => $this->categoryforum,
            'categoryforum_id' => $this->categoryforum_id,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
