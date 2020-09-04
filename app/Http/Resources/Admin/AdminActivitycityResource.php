<?php

namespace App\Http\Resources\Admin;

use App\Model\activitycity;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminActivitycityResource extends JsonResource
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
            'uploadimages' => $this->uploadimages()->get(),
            'contactservices' => $this->contactservices()->get(),
            'likeked' => $this->likeked(),
            'countlikes' => $this->likes()
                ->whereIn('likeable_id',[$this->id])
                ->where('likeable_type', activitycity::class)
                ->count(),
            'countcomments' => $this->comments()->count(),
            'countcontactservices' => $this->contactservices()->where('status_red',0)->count(),
            'countuploadimages' => $this->uploadimages()->count(),
            'status' => $this->status,
            'status_link_contact' => $this->status_link_contact,
            'status_comments' => $this->status_comments,
            'favoriteted' => $this->favoriteted(),
            'countfavorites' => $this->favorites()->count(),
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'user' => $this->user,
            'user_id' => $this->user_id,
            'city' => $this->city,
            'city_id' => $this->city_id,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'expired_at' => (string) $this->expired_at->diffInDays(),
        ];
    }
}
