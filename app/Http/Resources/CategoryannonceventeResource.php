<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryannonceventeResource extends JsonResource
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
            'icon' => $this->icon,
            'user' => $this->user,
            'photo' => $this->photo,
            'annonceventes_count' => $this->annonceventes_count,
            'blogannonceventes_count' => $this->blogannonceventes_count,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
