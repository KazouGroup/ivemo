<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UploadimageResource extends JsonResource
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
            'uploadimagealable_type' => $this->uploadimagealable_type,
            'uploadimagealable_id' => $this->uploadimagealable_id,
            'status' => $this->status,
            'photo' => $this->photo,
            'ip' => $this->ip,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
