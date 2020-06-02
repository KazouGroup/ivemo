<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactuserforadvertsResource extends JsonResource
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
            'confirm_send' => $this->confirm_send,
            'email' => $this->email,
            'phone' => $this->phone,
            'ip' => $this->ip,
            'slug' => $this->slug,
            'full_name' => $this->full_name,
            'appointment_time' => $this->appointment_time,
            'status' => $this->status,
            'message' => $this->message,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];    
    }
}
