<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivitycityResource extends JsonResource
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
            'uploadimages' => $this->uploadimages()
                ->where('status',1)->take(1)->get(),
            'likeked' => $this->likeked(),
            'countlikes' => $this->likes()->count(),
            'countcomments' => $this->comments()
                ->where('status',1)->take(1)->count(),
            'countuploadimages' => $this->uploadimages()
                ->where('status',1)->take(1)->count(),
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
        ];
    }
}
