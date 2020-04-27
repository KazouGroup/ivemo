<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogannonceventeResource extends JsonResource
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
            'slugin' => $this->slugin,
            'status' => $this->status,
            'status_admin' => $this->status_admin,
            'red_time' => $this->red_time,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'categoryannoncevente' => $this->categoryannoncevente,
            'categoryannoncevente_id' => $this->categoryannoncevente_id,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}