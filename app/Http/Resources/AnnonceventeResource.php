<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnnonceventeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $award_price = (int) ($this->price/$this->surface);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'slugin' => $this->slugin,
            'surface' => $this->surface,
            'rooms' => $this->rooms,
            'pieces' => $this->pieces,
            'price' => $this->price,
            'district' => $this->district,
            'award_price' => $award_price,
            'user' => $this->user,
            'user_id' => $this->user_id,
            'city' => $this->city,
            'city_id' => $this->city_id,
            'annoncetype' => $this->annoncetype,
            'status' => $this->status,
            'status_comments' => $this->status_comments,
            'status_admin' => $this->status_admin,
            'bookmarked' => $this->bookmarked(),
            'countsignals' => $this->signals()->count(),
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'statusOnline' => $this->isOnline(),
            'categoryannoncevente' => $this->categoryannoncevente,
            'signalannonceventes_count' => $this->signalannonceventes_count,
            'categoryannoncevente_id' => $this->categoryannoncevente_id,
            'disponible_date' => (string) $this->disponible_date,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
