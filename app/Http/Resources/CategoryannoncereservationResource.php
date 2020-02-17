<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryannoncereservationResource extends JsonResource
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
            'slug' => $this->slug,
            'name' => $this->name,
            'color_name' => $this->color_name,
            'annoncereservations_count' => $this->annoncereservations_count,
            'icon' => $this->icon,
            'photo' => $this->photo,
            'user' => $this->user,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
