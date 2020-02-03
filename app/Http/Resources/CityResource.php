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

        $annoncereservations = $this->annoncereservations()
            ->with('user','categoryannoncereservation','city','annoncetype')
            ->where('status',1)
            ->whereIn('city_id',[$this->id])
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->whereIn('annoncetype_id',[3]);
            })->distinct()->get()->toArray();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'city_vip' => $this->city_vip,
            'photo' => $this->photo,
            'slug' => $this->slug,
            'user' => $this->user,
            'annoncelocations' => $annoncelocations,
            'annoncelocations_count' => $this->annoncelocations_count,
            'annoncereservations' => $annoncereservations,
            'annoncereservations_count' => $this->annoncereservations_count,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
