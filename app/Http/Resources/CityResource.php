<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $annoncelocations = $this->annoncelocations()
            ->with('user','categoryannoncelocation','city','annoncetype')
            ->whereIn('city_id',[$this->id])
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->whereIn('annoncetype_id',[1])->where('status',1);
            })->distinct()->get()->toArray();

        dd($annoncelocations);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'city_vip' => $this->city_vip,
            'photo' => $this->photo,
            'slug' => $this->slug,
            'user' => $this->user,
            'annoncelocations' => $annoncelocations,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
