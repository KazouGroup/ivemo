<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'username' => $this->username,
            'email' => $this->email,
            'sex' => $this->sex,
            'color_name' => $this->color_name,
            'body' => $this->body,
            'avatar' => $this->avatar,
            'email_verified_at' => $this->email_verified_at,
            //'statusOnline' => $this->isOnline(),
            //'roles' => $this->roles()->pluck('name'),
            //'profile' => $this->profile,
            //'provider' => $this->provider,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
