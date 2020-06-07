<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmploymentResource extends JsonResource
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

            'bookmarked' => $this->bookmarked(),
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
            'city_id' => $this->city_id,
            'status' => $this->status,
            'status_admin' => $this->status_admin,
            //'contactuseremployments' => $this->contactuseremployments,
            'contactuseremployments_count' => $this->contactuseremployments_count,
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'categoryemployment_id' => $this->categoryemployment_id,
            'categoryemployment' => $this->categoryemployment,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
