<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CityResource extends JsonResource
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
            'name' => $this->name,
            'status' => $this->status,
            'city_vip' => $this->city_vip,
            'photo' => $this->photo,
            'slug' => $this->slug,
            'user' => $this->user,
            'annoncelocations_count' => $this->annoncelocations_count,
            'annoncereservations_count' => $this->annoncereservations_count,
            'annonceventes_count' => $this->annonceventes_count,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
