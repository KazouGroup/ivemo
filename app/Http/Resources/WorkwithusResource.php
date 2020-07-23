<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkwithusResource extends JsonResource
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
            'ip' => $this->ip,
            'user' => $this->user,
            'user_id' => $this->user_id,
            'city' => $this->city,
            'city_id' => $this->city_id,
            'status' => $this->status,
            'contactservices' => $this->contactservices,
            'contactservices_count' => $this->contactservices_count,
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'categoryworkwithus_id' => $this->categoryworkwithus_id,
            'categoryworkwithus' => $this->categoryworkwithus,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
