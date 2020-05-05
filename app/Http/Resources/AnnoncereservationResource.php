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
            'slugin' => $this->slugin,
            'district' => $this->district,
            'status' => $this->status,
            'status_admin' => $this->status_admin,
            'description' => $this->description,
            'price' => $this->price,
            'city_id' => $this->city_id,
            'city' => $this->city,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'adult_number' => $this->adult_number,
            'children_number' => $this->children_number,
            'annoncetype_id' => $this->annoncetype_id,
            'annoncetype' => $this->annoncetype,
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'categoryannoncereservation_id' => $this->categoryannoncereservation_id,
            'categoryannoncereservation' => $this->categoryannoncereservation,
            'signalannoncereservations_count' => $this->signalannoncereservations_count,
            'imagereservations' => $this->imagereservations,
            'disponible_date' => (string) $this->disponible_date,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
