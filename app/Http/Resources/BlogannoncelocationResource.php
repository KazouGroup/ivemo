<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogannoncelocationResource extends JsonResource
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
            'red_time' => $this->red_time,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'categoryannoncelocation' => $this->categoryannoncelocation,
            'categoryannoncelocation_id' => $this->categoryannoncelocation_id,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
