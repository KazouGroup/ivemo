<?php

namespace App\Http\Resources;

use App\Model\annoncereservation;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnoncereservationResource extends JsonResource
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
            'slug' => $this->slug,
            'slugin' => $this->slugin,
            'district' => $this->district,
            'status' => $this->status,
            'link_video' => $this->link_video,
            'status_comments' => $this->status_comments,
            'status_admin' => $this->status_admin,
            'description' => $this->description,
            'price' => $this->price,
            'promo_price' => $this->promo_price,
            'city_id' => $this->city_id,
            'periodeannonce_id' => $this->periodeannonce_id,
            'periodeannonce' => $this->periodeannonce,
            'city' => $this->city,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'surface' => $this->surface,
            'rooms' => $this->rooms,
            'pieces' => $this->pieces,
            'adult_number' => $this->adult_number,
            'children_number' => $this->children_number,
            'annoncetype_id' => $this->annoncetype_id,
            'annoncetype' => $this->annoncetype,
            'status_wifi' => $this->status_wifi,
            'status_parking' => $this->status_parking,
            'status_lunch' => $this->status_lunch,
            'dry_cleaning' => $this->dry_cleaning,
            'status_car_sharing' => $this->status_car_sharing,
            'status_consiegerie' => $this->status_consiegerie,
            'favoriteted' => $this->favoriteted(),
            'countfavorites' => $this->favorites()->count(),
            'likeked' => $this->likeked(),
            'countlikes' => $this->likes()
                ->whereIn('likeable_id',[$this->id])
                ->where('likeable_type', annoncereservation::class)
                ->count(),
            'uploadimages' => $this->uploadimages()
                ->where(['status' => 1,'status_admin' => 1])
                ->whereIn('uploadimagealable_id',[$this->id])
                ->where('uploadimagealable_type', annoncereservation::class)
                ->take(1)->get(),
            'countuploadimages' => $this->uploadimages()
                ->where(['status' => 1,'status_admin' => 1])
                ->whereIn('uploadimagealable_id',[$this->id])
                ->where('uploadimagealable_type', annoncereservation::class)
                ->count(),
            'countsignals' => $this->signals()->count(),
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'statusOnline' => $this->isOnline(),
            'categoryannoncereservation_id' => $this->categoryannoncereservation_id,
            'categoryannoncereservation' => $this->categoryannoncereservation,
            'signalannoncereservations_count' => $this->signalannoncereservations_count,
            'imagereservations' => $this->imagereservations,
            'disponible_date' => (string) $this->disponible_date,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'expired_at' => (string) $this->expired_at->diffInDays(),
        ];
    }
}
