<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryannoncelocationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $conseillocations = $this->conseillocations()->with('user','categoryannoncelocation')
            ->whereIn('categoryannoncelocation_id',[$this->id])->orderBy('created_at','DESC')
               ->where(function ($q){
                $q->where('status',1);
            })->distinct()->get()->toArray();
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'icon' => $this->icon,
            'user' => $this->user,
            'conseillocations' => $conseillocations,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
