<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PrivateEmploymentResource extends JsonResource
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
            'district' => $this->district,
            'price' => $this->price,
            'ip' => $this->ip,
            'user' => $this->user,
            'member' => $this->member,
            'user_id' => $this->user_id,
            'city' => $this->city,
            'photo' => $this->photo,
            'link_contact' => $this->link_contact,
            'city_id' => $this->city_id,
            'status' => $this->status,
            'status_comments' => $this->status_comments,
            'status_admin' => $this->status_admin,
            'status_link_contact' => $this->status_link_contact,
            'contactservices' => $this->contactservices,
            'contactservices_count' => $this->contactservices_count,
            'likeked' => $this->likeked(),
            'countlikes' => $this->likes()->count(),
            'bookmarked' => $this->bookmarked(),
            'iscontactservice' => $this->iscontactservice(),
            'visits_count' => $this->visits()->count(),
            'countcomments' => $this->comments()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'statusOnline' => $this->isOnline(),
            'categoryemployment_id' => $this->categoryemployment_id,
            'categoryemployment' => $this->categoryemployment,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
