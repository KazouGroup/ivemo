<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogannoncereservationResource extends JsonResource
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
            'photo' => $this->photo,
            'description' => $this->description,
            'slug' => $this->slug,
            'status' => $this->status,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'categoryannoncereservation' => $this->categoryannoncereservation,
            'categoryannoncereservation_id' => $this->categoryannoncereservation_id,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
