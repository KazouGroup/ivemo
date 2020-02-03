<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnnoncereservationResource extends JsonResource
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
            'slug' => $this->slug,
            'district' => $this->district,
            'status' => $this->status,
            'description' => $this->description,
            'price' => $this->price,
            'city_id' => $this->city_id,
            'city' => $this->city,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'annoncetype_id' => $this->annoncetype_id,
            'annoncetype' => $this->annoncetype,
            'categoryannoncereservation_id' => $this->categoryannoncereservation_id,
            'categoryannoncereservation' => $this->categoryannoncereservation,
            'disponible_date' => (string) $this->disponible_date,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}