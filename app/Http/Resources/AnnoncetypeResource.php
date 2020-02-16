<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnnoncetypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        $annonceventes = $this->annonceventes()->whereIn('annoncetype_id',[$this->id])
            ->with('user','categoryannoncevente','city','annoncetype')
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->where('status',1);
            })->distinct()->get()->toArray();

        $annoncereservations = $this->annoncereservations()->whereIn('annoncetype_id',[$this->id])
            ->with('user','categoryannoncereservation','city','annoncetype','imagereservations')
            ->orderBy('created_at','DESC')
            ->where(function ($q){
                $q->where('status',1);
            })->distinct()->get()->toArray();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'annonceventes' => $annonceventes,
            'annoncereservations' => $annoncereservations,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
