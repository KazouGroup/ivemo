<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactserviceResource extends JsonResource
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
            'full_name' => $this->full_name,
            'email' => $this->email,
            'slug' => $this->slug,
            'status_red' => $this->status_red,
            'phone' => $this->phone,
            'status_archvement' => $this->status_archvement,
            'status_favorite' => $this->status_favorite,
            'ip' => $this->ip,
            'message' => $this->message,
            'contactserviceable' => $this->contactserviceable,
            'from' => $this->from,
            'from_id' => $this->from_id,
            'to_id' => $this->to_id,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
