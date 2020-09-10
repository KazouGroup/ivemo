<?php

namespace App\Http\Resources;

use App\Model\forum;
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
            'countlikes' => $this->likes()
                ->whereIn('likeable_id',[$this->id])
                ->where('likeable_type', forum::class)
                ->count(),
            'countsignals' => $this->signals()->count(),
            'countcomments' => $this->comments()->count(),
            'status_comments' => $this->status_comments,
            'status_admin' => $this->status_admin,
            'status' => $this->status,
            'favoriteted' => $this->favoriteted(),
            'countfavorites' => $this->favorites()->count(),
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'categoryforum' => $this->categoryforum,
            'categoryforum_id' => $this->categoryforum_id,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'expired_at' => (string) $this->expired_at->diffInDays(),
        ];
    }
}
