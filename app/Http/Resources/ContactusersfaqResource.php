<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactusersfaqResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'ip' => $this->ip,
            'full_name' => $this->full_name,
            'subject' => $this->subject,
            'status' => $this->status,
            'message' => $this->message,
            'categoryuser_id' => $this->categoryuser_id,
            'categoryuser' => $this->categoryuser,
            'categoryobjet_id' => $this->categoryobjet_id,
            'categoryobjet' => $this->categoryobjet,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
